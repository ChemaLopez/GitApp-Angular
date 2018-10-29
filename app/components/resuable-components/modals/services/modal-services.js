(function () {
    'use strict'
    angular.module('my-app').service('modalService', modalService);

    modalService.$inject = ['$uibModal'];

function modalService($uibModal){

    var vm = this;
    vm.open=open;
    activate();

    function activate(){
    }


    function open(modal){
         return $uibModal.open({
            animation: false,
            templateUrl: modal.url,
            controller: 'modalController',
            controllerAs: 'modalCtrl',
            resolve: {
              errorObject: function () {
                return modal.message;
              }
            }
          });
    }
}

})();