(function () {
    'use strict'

    /**
     * @description Controller for the GitHub Module
     */
    angular.module('my-app').controller('GitHubRepoController', GithubController)

    GithubController.$inject = ['gitRepoService', 'modalService'];
    
    function GithubController(pageService, modalService) {
      
        var vm = this;
        vm.model = initModel();
        vm.launchRepo = launchRepo;

        /////////////////////////////////////////////
        function initModel() {
            return { 'showOrderComponent': false, 'repoList': { } };
        }
        /**
         * @description call HttpService with a repository name to obtain repositories with the same name
         */
        function launchRepo() {
            if(vm.valueRepo!==undefined){      
                      vm.model.showOrderComponent = true;
             pageService.launchRepoRequest(vm.valueRepo).then(infoRepoSuccess,infoRepoError);
            }

        }
        /**
         * @description Show on view all the information after resolve a succes promise
         * @param {Object} data 
         */
        function infoRepoSuccess(data) {
            vm.model.repoList = data;
            vm.model.showOrderComponent = false;
       }
        /**
         * @description Show on view the error code after resolve a error promise
         * @param {Error} reject 
         */
        function infoRepoError(reject) {
            vm.model.showOrderComponent = false;
            modalService.open({url:'my-app/templates/modal-error.html', message:"Codigo de error: "+reject.status});
        }
    };
})();