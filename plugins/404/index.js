"user strict";
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(function(require){
    // 404 plugin must depend on all other plugins with routes defined so it won't
    // overwrite any routes defined after it.
    plugin.consumes = ['app', 'home'];
    plugin.provides = [];

    return plugin;

    function plugin(options, imports, register){
        var path = require('path'),
            app = imports.app;

        // Add static directory
        app.addStaticRoute('/404', path.join(__dirname, 'www'));

        // Define HTTP API

        // 404 Handler
        app.app.use(function(req, res){
            if(req.accepts('html')){
                res.sendFile(app.indexDir);
            }
            else if(req.accepts('json')){
                res.status(404).send({error: "Resource not found"});
            }
        });

        // Plugin public api
        register();
    }
});
