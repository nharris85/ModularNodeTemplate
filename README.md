# ModularNodeTemplate

This is a template for a lazily loaded javascript module web application using NodeJS with AngularJS. The main focus of this template is to provide the framework for modularity not to make too many technology decisions like authorization, authentication, and data storage. I think it is a good foundation to help someone get started with a Node and Angular web project.

# Requirements

* NodeJS v0.11.14+
* NPM v2.14.12+
* Gulp v3.9+

# Installing

* Download ModularNodeTemplate via git or download zip
* Install node modules and bower components
```
$ npm install
```

# Gulp Tasks

* Start node and monitor for file changes
```
$ gulp start
```
* Run unit tests and jshint
```
$ gulp test
```

# Plugins

Each plugin is a self contained componenet of the web app. It contains server side and client side code. This was the main driving force behind creating this template. If this is not your preference this may not be the template you are looking for.

## Architecture

The plugin's already provided follow a common structure but this can be modified to best fit your preference.

```
plugins/
├── 404
│   ├── index.js
│   └── www
│       └── views
│           └── 404
│               ├── 404.css
│               ├── 404.html
│               └── 404.js
├── app
│   ├── index.js
│   ├── __tests__
│   │   └── www
│   │       └── app.spec.js
│   └── www
│       ├── app.css
│       ├── app.js
│       ├── index.html
│       └── main.js
├── home
│   ├── index.js
│   └── www
│       └── views
│           └── home
│               ├── home.css
│               ├── home.html
│               └── home.js
├── http
│   └── index.js
├── https
│   └── index.js
└── nav
    ├── index.js
    └── www
        └── views
            └── nav
                ├── nav.css
                ├── nav.html
                └── nav.js
```

### Server Side Dependency Management

Each plugin contains an index.js file which contains the server side code. The server side depenency management library used here is [c9:Architect](https://github.com/c9/architect). Configuration for your services is found under 'conf'. The DI library hasn't been updated in a while and documentation isn't great but I really liked how it did DI. One thing that is lacking with it is integration with NPM require. I would prefer that it check node modules if it can't find my local plugin.

### Client Side Dependency Management

For the client side I felt angular's DI wasn't good enough so I started using [RequireJS](http://requirejs.org/docs/node.html) with [AMDefine](https://github.com/jrburke/amdefine) to help with all of the plugin's javascript files. 

### Lazy Loading Client Side Javascript

Angular and RequireJS were nice but I hated how I had to add the JS file to the index.html for each plugin. It felt dirty. I attempted to figure out dynamice module registration with Angular on my own but ran into a lot of problems. In my search for debugging errors I cam acrros [AngularAMD](https://github.com/marcoslin/angularAMD). This was the final piece that enabled the kind of modularity I was searching for.

## Writing a Plugin

### Consuming the Express App

Most plugins will be a feature of the webapp and will need to consume the 'app' plugin. This will give the plugin access to the Express app so that it can create routes. If defining routes or client side views are not needed for the plugin then you don't need to consume 'app'.

### Providing Reusable Code

With Architect you can 'provide' a javascript object that will be consumed by other plugins. Not every plugin has to provide an object. The register() at the end of the plugin is how you will expose your plubic API to other plugins.

### Client Side Views

The plugin 'app' exposes a function called 'addStaticRoute'. This is a convenience function for correctly configuring the app routes for static view files. The function takes two arguments, 'pathUrls' and 'dir'. The 'dir' parameter is the absolute path to the directory containing your static client side files. The 'pathUrls' is an array of paths that should be configured to serve up the single page index.html. This is needed in order to support the html5 feature of real path urls instead of having to use '#' paths for your client side routing.

My preference was to organize the html, css, and js together with the view component which is why under the 'www' directory you have 'views/[COMPONENT]/[COMPONENT].js|html|css'. This can be changed to your preference.

### Angular Plugin Controllers

Each plugin has control over defining their own controllers. This was enabled by the AngularAMD library. Normally dynamically adding controllers like this wouldn't work just using the standard single page view feature of Angular.

### Client Side Routes

Routes must be defined a configuration phase in Angular. This means that they are all defined in the 'app' plugin. This is not ideal in my opinion but I think the only way to delegate this responsibility to other plugins is to define a separate angular module and have 'app' depend on that module. You are still having to make 'app' have dirty knowledge of the plugin so this is only a moderate win with regards to design. This template doesn't bother to do that since there aren't any routes really.

