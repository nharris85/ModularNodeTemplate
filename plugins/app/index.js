"user strict";
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(function(require) {
    plugin.consumes = [];
    plugin.provides = ['app'];

    return plugin;

    function plugin(options, imports, register) {
        var path = require('path'),
            lodash = require('lodash'),
            express = require('express'),
            fs = require('fs'),
            logger = require('morgan'),
            cookieParser = require('cookie-parser'),
            bodyParser = require('body-parser'),
            //https = require('https'),
            app = express(),
            indexDir = path.join(__dirname, 'www', 'index.html');

        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(cookieParser());

        // Define static routes
        app.use(express.static(path.join(__dirname, 'www')));
        app.use('/lib', express.static(path.join(process.env.PROJECT_DIR, process.env.STATIC_LIBS)));

        function addStaticRoute(pathUrls, dir) {
            app.use(express.static(dir));
            pathUrls = (lodash.isEmpty(pathUrls) || pathUrls === '/') ? undefined : !lodash.isArray(pathUrls) ? [pathUrls] : pathUrls;

            if (pathUrls) {
                for (var i in pathUrls) {
                    var pathUrl = pathUrls[i];
                    app.use(pathUrl, function(req, res) {
                        res.sendFile(indexDir);
                    });
                }
            }
        }
        register(null, {
            'app': {
                'app': app,
                'addStaticRoute': addStaticRoute,
                'indexDir': indexDir
            }
        });
    }
});
