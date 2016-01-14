'use strict';

/* ======================
 * ----- USERS ------
 */
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

/* ======================
 * ----- CLIENTS ------
 */
clientsService.$inject = ['$http', 'notify'];
function clientsService($http, notify) {
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
            notify.success(response.data.msg);
            return response.data;
        });
    };

    this.updateClient = function (params) {
        return $http({
            url: '../server/mr-client.php',
            method: 'PUT',
            params: params
        }).then(function successCallback(response) {
            notify.success(response.data.msg);
            return response.data;
        });
    };

    this.deleteClient = function (params) {
        return $http({
            url: '../server/mr-client.php',
            method: 'DELETE',
            params: params
        }).then(function successCallback(response) {
            notify.success(response.data.msg);
            return response.data;
        });
    };
}

/* ======================
 * ----- CASES ------
 */
casesService.$inject = ['$http', 'notify'];
function casesService($http, notify) {
    this.fetchCases = function (params) {
        return $http({
            url: '../server/mr-case.php',
            method: 'GET',
            params: params
        }).then(function successCallback(response) {
            return response.data;
        });
    };

    this.addCase = function (params) {
        return $http({
            url: '../server/mr-case.php',
            method: 'POST',
            params: params
        }).then(function successCallback(response) {
            notify.success(response.data.msg);
            return response.data;
        });
    };

    this.updateCase = function (params) {
        return $http({
            url: '../server/mr-case.php',
            method: 'PUT',
            params: params
        }).then(function successCallback(response) {
            notify.success(response.data.msg);
            return response.data;
        });
    };

    this.deleteCase = function (params) {
        return $http({
            url: '../server/mr-case.php',
            method: 'DELETE',
            params: params
        }).then(function successCallback(response) {
            notify.success(response.data.msg);
            return response.data;
        });
    };
}

/* ======================
 * ----- CALENDAR ------
 */
calendarService.$inject = ['$http', 'notify'];
function calendarService($http, notify) {
    this.fetchCalendar = function (params) {
        return $http({
            url: '../server/mr-calendar.php',
            method: 'GET',
            params: params
        }).then(function successCallback(response) {
            return response.data;
        });
    };

    this.addCalendar = function (params) {
        return $http({
            url: '../server/mr-calendar.php',
            method: 'POST',
            params: params
        }).then(function successCallback(response) {
            notify.success(response.data.msg);
            return response.data;
        });
    };

    this.updateCalendar = function (params) {
        return $http({
            url: '../server/mr-calendar.php',
            method: 'PUT',
            params: params
        }).then(function successCallback(response) {
            notify.success(response.data.msg);
            return response.data;
        });
    };

    this.deleteCalendar = function (params) {
        return $http({
            url: '../server/mr-calendar.php',
            method: 'DELETE',
            params: params
        }).then(function successCallback(response) {
            notify.success(response.data.msg);
            return response.data;
        });
    };
}

angular.module('mojrokovnik.api', [])
        .service('userService', userService)
        .service('clientsService', clientsService)
        .service('casesService', casesService)
        .service('calendarService', calendarService);