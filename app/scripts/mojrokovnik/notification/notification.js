'use strict';

notificationService.$inject = ['$mdToast'];
function notificationService($mdToast) {
    this.show = function (text) {
        $mdToast.show($mdToast.simple().content(text).position('top right'));
    };
}

angular.module('mojrokovnik.notification', ['ngMaterial'])
        .service('notificationService', notificationService);