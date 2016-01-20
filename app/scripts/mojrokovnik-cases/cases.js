'use strict';

casesCtrl.$inject = ['$scope', 'api', '$uibModal'];
function casesCtrl($scope, api, $uibModal) {

    api('cases').fetch({case_delete: 0}).then(function (cases) {
        $scope.cases = cases;
        $scope.sCase = cases[0];

        api('clients').fetch({client_id: cases[0].client_id}).then(function (client) {
            $scope.client = client[0];
        });
    });

    $scope.selectCase = function (ucase) {
        $scope.sCase = ucase;

        api('clients').fetch({client_id: ucase.client_id}).then(function (client) {
            $scope.client = client[0];
        });
    };

    $scope.removeCase = function (cases) {
        api('cases').delete(cases).then(function () {
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

        api('clients').fetch({client_delete: 0}).then(function (clients) {
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
                api('cases').update(cases).then(function () {
                    $scope.editMode = false;
                    $uibModalInstance.close();
                });
            } else {
                api('cases').add(cases).then(function () {
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