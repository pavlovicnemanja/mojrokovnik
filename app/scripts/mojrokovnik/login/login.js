'use strict';

mrLoginCtrl.$inject = ['$location', '$http', '$cookies', '$scope', 'notify', 'userService'];
function mrLoginCtrl($location, $http, $cookies, $scope, notify, userService) {
    $scope.login = function (login) {
        $http({
            url: '../server/mr-login.php',
            method: 'POST',
            params: login
        }).then(function successCallback(response) {
            if (response.data.login) {
                userService.fetchUser().then(function (user) {
                    if (user) {
                        $cookies.putObject('user', user);
                        $location.url('/clients');
                    }
                });
            } else {
                notify.error(response.data['msg']);
            }
        });
    };
}

angular.module('mojrokovnik.login', [])
        .controller('mrLoginCtrl', mrLoginCtrl);