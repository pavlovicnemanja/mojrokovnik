'use strict';

angular.module('mojrokovnik.navigation', [])
        .directive('mrMainNavigation', function ($location, authentification) {
            return {
                templateUrl: 'scripts/mojrokovnik/navigation/navigation.html',
                link: function (scope) {
                    scope.visible = authentification.isLoggedIn();
                    scope.isCurrentPath = function (value) {
                        return $location.$$path === value;
                    };
                }
            };
        });