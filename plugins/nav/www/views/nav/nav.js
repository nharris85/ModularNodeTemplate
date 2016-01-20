"use strict";
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['angularAMD'], function(angularAMD){

    angularAMD.directive('navbar', function () {
        return {
            restrict: 'E',
            controller: 'NavigationController',
            templateUrl: 'views/nav/nav.html'
        };
    });

    angularAMD.controller('NavigationController', ['$scope', '$location', function($scope, $location){
        $scope.go = function(path){
            $location.path(path);
        };
    }]);
})
