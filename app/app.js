'use strict';

angular.module('mojrokovnik', ['ngRoute',
    'mojrokovnik.api',
    'mojrokovnik.navigation',
    'mojrokovnik.dashboard'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/dashboard'});
    $routeProvider.when('/dashboard', {
        templateUrl: 'scripts/mojrokovnik-dashboard/dashboard.html'
    });
}]);
