'use strict';

clientsCtrl.$inject = ['$scope', 'clientsService', '$mdDialog'];
function clientsCtrl($scope, clientsService, $mdDialog) {
    $scope.getClients = function () {
        clientsService.fetchClients().then(function (clients) {
            $scope.clients = clients;
            $scope.selClient = clients[0];
        });
    };

    $scope.showDialog = function (event, client) {
        $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            locals: client,
            controller: dialogCtrl,
            templateUrl: 'scripts/mojrokovnik-clients/clients-dialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        });
    };

    $scope.selectClient = function (client) {
        $scope.selClient = client;
    };

    $scope.removeClient = function (client) {
        clientsService.deleteClient(client).then(function () {
            $scope.clients = _.without($scope.clients, client);
            $scope.selClient = $scope.clients[0];
        });
    };

    $scope.getClients();
}

dialogCtrl.$inject = ['$scope', '$mdDialog', 'clientsService', 'locals'];
function dialogCtrl($scope, $mdDialog, clientsService, locals) {
    $scope.client = locals;

    $scope.save = function (client) {
        if (locals) {
            clientsService.updateClient(client).then(function () {
                $mdDialog.hide();
            });
        } else {
            clientsService.addClient(client).then(function () {
                $scope.clients.push(client);
                $mdDialog.hide();
            });
        }
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}

clientsSidenav.$inject = [];
function clientsSidenav() {
    return {
        controller: clientsCtrl,
        link: function (scope, elem, attr, ctrl) {
        }
    };
}

clientsTemplate.$inject = [];
function clientsTemplate() {
    return {
        link: function (scope, elem, attr, ctrl) {
        }
    };
}

angular.module('mojrokovnik.clients', ['ngMaterial'])
        .controller('clientsCtrl', clientsCtrl)
        .directive('clientsSidenav', clientsSidenav)
        .directive('clientsTemplate', clientsTemplate);