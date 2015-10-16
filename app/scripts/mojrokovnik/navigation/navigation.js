'use strict';

angular.module('mojrokovnik.navigation', ['ngRoute'])
    .controller('mrMainNvigationCtrl', [function() {}])
    .directive('mrMainNavigation', function ($location) {
        return {
            templateUrl: 'scripts/mojrokovnik/navigation/navigation.html',
            controller: 'mrMainNvigationCtrl',
            link: function (scope, elem) {
                scope.isCurrentPath = function (value) {
                    return $location.$$path === value;
                };
            }
        };
    });