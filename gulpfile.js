var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    mocha = require('gulp-mocha'),
    jshint = require('gulp-jshint'),
    gutil = require('gulp-util'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync'),
    lodash = require('lodash'),
    paths = {
        source: ['plugins/**/*', 'bin/server.js'],
        scripts: ['plugins/**/*.js', 'bin/server.js'],
        tests: ['plugins/**/*.spec.js']
    };

// Test Tasks
gulp.task('mocha', function(){
    global.expect = require('chai').expect;
    global.sinon = require('sinon');
    global.path = require('path');
    global.startDB = function(){
        if(!lodash.isEmpty(global.dbProc)){
            global.stopDB();
        }
        global.dbProc = spawn('java', ['-Dbin/dynamodb/DynamoDBLocal_lib', '-jar', 'bin/dynamodb/DynamoDBLocal.jar', '-sharedDb', '-inMemory']);
    }

    global.stopDB = function(){
        if(!lodash.isEmpty(global.dbProc)){
            global.dbProc.kill('SIGTERM');
            global.dbProc = null;
        }
    }

    global.beforeEach = function(){
        this.sinon = global.sinon.sandbox.create();
    };

    global.afterEach = function(){
        this.sinon.restore();
    };

    return gulp.src(paths.tests, {read: false})
        .pipe(mocha({
            reporter: 'spec',
            should: require('chai').should()
        }));
});

gulp.task('lint', function(){
    return gulp.src(paths.scripts.concat(paths.tests))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['lint', 'mocha']);
// End Test Tasks

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'bin/server.js',

    // watch core server file(s) that require server restart on change
    watch: ['bin/server.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    // Change to https as needed
    proxy: 'http://localhost:' + process.env.PORT,

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    // Uncomment for https
    // port: 4443,

    files: ['plugins/**/*.*'],

    // open the proxied app in chrome
    browser: ['google-chrome']
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('dynamodb', function(){
    child = spawn('java', ['-Dbin/dynamodb/DynamoDBLocal_lib', '-jar', 'bin/dynamodb/DynamoDBLocal.jar', '-sharedDb', '-dbPath', '.db']);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
});

gulp.task('dev-env', function(){
    process.env.PROJECT_DIR = __dirname;
    process.env.STATIC_LIBS = 'bower_components';
    process.env.CONFIG = 'dev';
    // change to 8443 when using https
    process.env.PORT = 8080;
});

gulp.task('start', ['dev-env', 'dynamodb', 'browser-sync'], function () {
  gulp.watch('public/**/*.*', ['bs-reload']);
});

gulp.task('default', ['test']);
