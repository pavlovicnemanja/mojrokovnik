'use strict';

clientsCtrl.$inject = ['$scope', 'clientsService', '$uibModal'];
function clientsCtrl($scope, clientsService, $uibModal) {
    clientsService.fetchClients().then(function (clients) {
        $scope.clients = clients;
        $scope.selClient = clients[0];
    });

    $scope.selectClient = function (client) {
        $scope.selClient = client;
    };

    $scope.removeClient = function (client) {
        clientsService.deleteClient(client).then(function () {
            $scope.clients = _.without($scope.clients, client);
            $scope.selClient = $scope.clients[0];
        });
    };

    $scope.showDialog = function (client) {
        if (client) {
            $scope.client = client;
            $scope.editMode = true;
        } else {
            delete $scope.client;
            $scope.editMode = false;
        }

        $uibModal.open({
            animation: true,
            scope: $scope,
            templateUrl: 'scripts/mojrokovnik-clients/clients-dialog.html',
            controller: clientDialogCtrl
        });
    };

    function clientDialogCtrl($uibModalInstance) {
        $scope.save = function (client) {
            if ($scope.editMode) {
                clientsService.updateClient(client).then(function () {
                    $scope.editMode = false;
                    $uibModalInstance.close();
                });
            } else {
                clientsService.addClient(client).then(function () {
                    $scope.clients.push(client);
                    $uibModalInstance.close();
                });
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }
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