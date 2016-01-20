"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['angularAMD', 'angular', 'ngRoute', 'ngResource', 'views/nav/nav'], function(angularAMD){
    var app = angular.module('myapp', ['ngRoute', 'ngResource']);

    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
        $locationProvider.html5Mode(true);
        $routeProvider.when("/", angularAMD.route({
            templateUrl: 'views/home/home.html',
            controllerUrl: 'views/home/home'
        }))
        .otherwise(angularAMD.route({
            templateUrl: 'views/404/404.html',
            controllerUrl: 'views/404/404'
        }));

    }]);
    return angularAMD.bootstrap(app);
});
