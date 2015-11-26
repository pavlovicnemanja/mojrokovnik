'use strict';

mojrokovnikAuth.$inject = [];
function mojrokovnikAuth() {
    var user;
    return {
        setUser: function (aUser) {
            user = aUser;
        },
        isLoggedIn: function () {
            return(user) ? user : false;
        }
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

angular.module('mojrokovnik', ['ngRoute',
    'mojrokovnik.api',
    'mojrokovnik.login',
    'mojrokovnik.navigation',
    'mojrokovnik.clients'
])
.factory('authentification', mojrokovnikAuth)
.config(['$routeProvider', mojrokovnikConf]);