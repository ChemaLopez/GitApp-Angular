(function () {
    'use strict'
    angular.module('my-app').component('sortComponent', {
        templateUrl: 'my-app/templates/order.html',
        controller: 'sortController',
        controllerAs: 'sortCtrl',
        bindings: {
            repoList: '<'
        }
    });
})();