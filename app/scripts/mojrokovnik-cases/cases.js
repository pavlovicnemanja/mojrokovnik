'use strict';

casesCtrl.$inject = ['$scope', 'casesService', 'clientsService', '$uibModal'];
function casesCtrl($scope, casesService, clientsService, $uibModal) {
    casesService.fetchCases().then(function (cases) {
        $scope.cases = cases;
        $scope.selCase = cases[0];
    });

    $scope.selectCase = function (cases) {
        $scope.selCase = cases;
    };

    $scope.removeCase = function (cases) {
        casesService.deleteCase(cases).then(function () {
            $scope.cases = _.without($scope.cases, cases);
            $scope.selCase = $scope.cases[0];
        });
    };

    $scope.showDialog = function (cases) {
        if (cases) {
            $scope.newCase = cases;
            $scope.editMode = true;
        } else {
            delete $scope.newCase;
            $scope.editMode = false;
        }

        clientsService.fetchClients().then(function (clients) {
            $scope.clients = clients;
        });

        $uibModal.open({
            animation: true,
            scope: $scope,
            templateUrl: 'scripts/mojrokovnik-cases/cases-dialog.html',
            controller: casesDialogCtrl
        });
    };

    function casesDialogCtrl($uibModalInstance) {
        $scope.save = function (cases) {
            if ($scope.editMode) {
                casesService.updateCase(cases).then(function () {
                    $scope.editMode = false;
                    $uibModalInstance.close();
                });
            } else {
                casesService.addCase(cases).then(function () {
                    $scope.cases.push(cases);
                    $uibModalInstance.close();
                });
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
    }
}

casesSidenav.$inject = [];
function casesSidenav() {
    return {
        controller: casesCtrl,
        link: function (scope, elem, attr, ctrl) {
        }
    };
}

casesTemplate.$inject = [];
function casesTemplate() {
    return {
        link: function (scope, elem, attr, ctrl) {
        }
    };
}

angular.module('mojrokovnik.cases', ['ngMaterial'])
        .controller('casesCtrl', casesCtrl)
        .directive('casesSidenav', casesSidenav)
        .directive('casesTemplate', casesTemplate);