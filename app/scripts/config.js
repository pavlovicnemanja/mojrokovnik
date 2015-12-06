'use strict';

mojrokovnikAuth.$inject = ['userService', '$cookies'];
function mojrokovnikAuth(userService, $cookies) {
    var self = this;

    userService.fetchUser().then(function (user) {
        if (user) {
            self.user = user;
        }
    });

    this.getUser = function () {
        return self.user;
    };

    this.isLoggedIn = function () {
        return !!$cookies.getObject('user');
    };
}

mojrokovnikConf.$inject = ['$routeProvider'];
function mojrokovnikConf($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/clients'});
    $routeProvider.when('/clients', {
        templateUrl: 'scripts/mojrokovnik-clients/clients.html'
    });
    $routeProvider.when('/login', {
        templateUrl: 'scripts/mojrokovnik/login/login.html'
    });
}

angular.module('mojrokovnik', [
    'ngRoute', 'ngCookies',
    'mojrokovnik.api',
    'mojrokovnik.login',
    'mojrokovnik.navigation',
    'mojrokovnik.notification',
    'mojrokovnik.clients'
])
.service('authentification', mojrokovnikAuth)
.config(['$routeProvider', mojrokovnikConf])
.run(function ($rootScope, $location, authentification) {

    $rootScope.$on('$routeChangeStart', function (event, next) {
        if (authentification.isLoggedIn()) {
            $location.url('/clients');
        } else {
            $location.url('/login');
        }
    });

});