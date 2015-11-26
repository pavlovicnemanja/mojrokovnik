'use strict';

clientsSidenav.$inject = ['clientsService'];
function clientsSidenav(clientsService) {
    return {
        link: function (scope, elem, attr, ctrl) {
            var params = {
                'client_name': 'nemanja'
            };
            clientsService.fetchClients(params).then(function (item) {
                scope.items = item;
                console.log(item);
            });
        }
    };
}

clientsTemplate.$inject = ['clientsService', '$mdDialog'];
function clientsTemplate(clientsService, $mdDialog) {
    return {
        link: function (scope, elem, attr, ctrl) {
            scope.clientDialog = function (event) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'scripts/mojrokovnik-clients/clients-dialog.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true
                });
            };

            scope.addClient = function() {
                
            };
        }
    };
}

function DialogController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}

angular.module('mojrokovnik.clients', ['ngMaterial'])
        .directive('clientsSidenav', clientsSidenav)
        .directive('clientsTemplate', clientsTemplate);