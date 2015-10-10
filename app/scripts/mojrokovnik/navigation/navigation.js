'use strict';

angular.module('mojrokovnik.navigation', ['ngRoute'])
    .directive('mrMainNavigation', function ($location) {
        return {
            templateUrl: 'scripts/mojrokovnik/navigation/navigation.html',
            link: function (scope, elem) {
                scope.isCurrentPath = function (value) {
                    return $location.$$path === value;
                };
            }
        };
    });