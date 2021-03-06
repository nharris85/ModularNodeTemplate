"user strict";
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(function(require){
    plugin.consumes = ['app'];
    plugin.provides = [];

    return plugin;

    function plugin(options, imports, register){
        var path = require('path'),
            lodash = require('lodash'),
            app = imports.app.app;

        // Start express app
        app.listen(process.env.PORT, function(){
            console.log("Express app listening on port %s", process.env.PORT);
        });

        /** HTTPS
        https.createServer({
            key: fs.readFileSync(options.key),
            cert: fs.readFileSync(options.cert)
        }, app).listen(process.env.PORT, function(){
            console.log("Express server listening at port %s", process.env.PORT);
        });
        */

        // Public methods
        register();
    }
});
