"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['app'], function(app){
    app.controller('HomeController', ['$scope', function($scope){
        $scope.name="World";
    }]);
});
