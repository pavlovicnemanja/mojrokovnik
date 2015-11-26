'use strict';

angular.module('mojrokovnik.login', [])
        .directive('mrLogin', function ($location) {
            return {
                templateUrl: 'scripts/mojrokovnik/login/login.html',
                link: function (scope, elem) {

                }
            };
        });