"user strict";
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(function(require){
    plugin.consumes = ['app'];
    plugin.provides = ['home'];

    return plugin;

    function plugin(options, imports, register){
        var path = require('path'),
            app = imports.app.app,
            addStaticRoute = imports.app.addStaticRoute;

        addStaticRoute('/', path.join(__dirname, 'www'));

        // Define HTTP API

        // Plugin public api. Can't be empty because of 404 plugin dependency
        register(null, {
            "home": {}
        });
    }
});
