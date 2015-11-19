'use strict';

usersService.$inject = ['$http'];
function usersService($http) {
    this.fetchUsers = function (params) {
        return $http({
            url: '../server/controllers/np-database.php',
            method: 'GET',
            params: params
        }).then(function successCallback(response) {
            return response;
        });
    };
}

clientsService.$inject = ['$http'];
function clientsService($http) {
    this.fetchClients = function (params) {
        return $http({
            url: '../server/controllers/np-database.php',
            method: 'GET',
            params: params
        }).then(function successCallback(response) {
            return response;
        });
    };
}

casesService.$inject = ['$http'];
function casesService($http) {
    this.fetchCases = function (params) {
        return $http({
            url: '../server/controllers/np-database.php',
            method: 'GET',
            params: params
        }).then(function successCallback(response) {
            return response;
        });
    };
}

angular.module('mojrokovnik.api', [])
        .service('usersService', clientsService)
        .service('clientsService', clientsService)
        .service('casesService', clientsService);