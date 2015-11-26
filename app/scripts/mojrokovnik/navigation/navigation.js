'use strict';

angular.module('mojrokovnik.navigation', [])
        .directive('mrMainNavigation', function ($location) {
            return {
                templateUrl: 'scripts/mojrokovnik/navigation/navigation.html',
                link: function (scope) {
                    scope.isCurrentPath = function (value) {
                        return $location.$$path === value;
                    };
                }
            };
        });