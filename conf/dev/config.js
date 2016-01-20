"use strict";

var path = require('path');

function pluginDir(service){
    return path.join(process.env.PROJECT_DIR, "plugins", service);
}

module.exports =  [
    pluginDir('app'),
    /** Replace http plugin with https to enable https
    {
        packagePath: pluginDir('https'),
        key: path.join(__dirname, 'key.pem'),
        cert: path.join(__dirname, 'cert.pem')
    },
    */
    pluginDir('http'),
    pluginDir('home'),
    pluginDir('nav'),
    pluginDir('404')
];
