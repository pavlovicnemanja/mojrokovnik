'use strict';

angular.module('mojrokovnik.view2', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl2'
    });
}])

.controller('View2Ctrl2', [function () {

}]);
