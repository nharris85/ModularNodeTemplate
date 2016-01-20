require.config({
    // baseUrl: '../',

  // alias libraries paths
    paths: {
        // 'domReady': '../lib/requirejs-domready/domReady',
        'angular': 'lib/angular/angular.min',
        'angularAMD': 'lib/angularAMD/angularAMD.min',
        'ngRoute': 'lib/angular-route/angular-route.min',
        'jquery': 'lib/jquery/dist/jquery.min',
        'ngResource': 'lib/angular-resource/angular-resource.min'
    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        angular: {exports: 'angular', deps: ['jquery']},
        'angularAMD': ['angular'],
        'ngload': ['angularAMD'],
        ngRoute: ['angular'],
        jquery: {exports: '$'},
        'ngResource': ['angular']
    },

    // kick start application
    deps: ['app']
});
