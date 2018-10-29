(function () {
    'use strict'

    angular.module('my-app').controller('modalController', modalController);

    modalController.$inject = ['$uibModalInstance', 'errorObject']

    function modalController($uibModalInstance, errorObject) {

        var vm = this;
        vm.cancel = cancel;
        vm.acept = acept;
        activate();

        function activate() {
            vm.model=errorObject;
        }

        function cancel() {
            $uibModalInstance.dismiss();
        };

        function acept(){
            $uibModalInstance.close();
    }

    }
})();