'use strict';

dashboardTemplate.$inject = ['clientsService'];
function dashboardTemplate(clientsService) {
    return {
        link: function (scope, elem, attr, ctrl) {
            clientsService.fetchClients().then(function(item) {
                console.log(item.data);
            });
        }
    };
}

angular.module('mojrokovnik.dashboard', [])
        .directive('dashboardTemplate', dashboardTemplate);