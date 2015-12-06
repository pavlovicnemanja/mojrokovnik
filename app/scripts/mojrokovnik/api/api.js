'use strict';

userService.$inject = ['$http'];
function userService($http) {
    this.fetchUser = function () {
        return $http({
            url: '../server/mr-user.php',
            method: 'GET'
        }).then(function successCallback(response) {
            return response.data;
        });
    };
}

clientsService.$inject = ['$http', 'notificationService'];
function clientsService($http, notificationService) {
    this.fetchClients = function (params) {
        return $http({
            url: '../server/mr-client.php',
            method: 'GET',
            params: params
        }).then(function successCallback(response) {
            return response.data;
        });
    };

    this.addClient = function (params) {
        return $http({
            url: '../server/mr-client.php',
            method: 'POST',
            params: params
        }).then(function successCallback(response) {
            notificationService.show(response.data.msg);
            return response.data;
        });
    };

    this.updateClient = function (params) {
        return $http({
            url: '../server/mr-client.php',
            method: 'PUT',
            params: params
        }).then(function successCallback(response) {
            notificationService.show(response.data.msg);
            return response.data;
        });
    };

    this.deleteClient = function (params) {
        return $http({
            url: '../server/mr-client.php',
            method: 'DELETE',
            params: params
        }).then(function successCallback(response) {
            notificationService.show(response.data.msg);
            return response.data;
        });
    };
}

angular.module('mojrokovnik.api', [])
        .service('userService', userService)
        .service('clientsService', clientsService);