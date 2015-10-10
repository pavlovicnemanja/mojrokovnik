'use strict';

// Declare app level module which depends on views, and components
angular.module('mojrokovnik', [
  'ngRoute',
  'mojrokovnik.view1',
  'mojrokovnik.view2'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
