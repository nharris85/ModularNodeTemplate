"use strict";

var path = require('path');

function pluginDir(service){
    return path.join(process.env.PROJECT_DIR, "plugins", service);
}

module.exports =  [
    pluginDir('app'),
    pluginDir('http'),
    pluginDir('home'),
    pluginDir('nav'),
    pluginDir('404')
];
