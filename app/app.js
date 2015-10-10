'use strict';

angular.module('mojrokovnik', ['ngRoute',
    'mojrokovnik.navigation',
    'mojrokovnik.dashboard'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/dashboard'});
    $routeProvider.when('/dashboard', {
        templateUrl: 'scripts/mojrokovnik-dashboard/dashboard.html'
    });
}]);
