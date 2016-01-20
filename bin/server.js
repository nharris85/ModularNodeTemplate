if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require){
    var path = require('path'),
        architect = require('architect'),
        configPath = path.join(process.env.PROJECT_DIR, "conf", process.env.CONFIG, "config.js"),
        config = architect.loadConfig(configPath);

    var a = architect.createApp(config, function(err, app){
        if(err) throw err;
        console.log("Architect app ready");
    });
});
