(function () {

    angular.module('my-app').controller('GitUsersController', gitUsersController);

    gitUsersController.$inject = ['modalService', 'gitUserService', '$scope'];


    function gitUsersController(modalService, gitUserService, $scope) {


        var vm = this;

        vm.model = activity();
        $scope.$on('repo-launch-Modal', repoLaunchModal);
        $scope.$on('user-details-back', back);
        $scope.$on('followers-launch-Modal', followersLaunchModal);

        function activity() {
            gitUserService.getUsers().then(infoUsersSucces, infoUsersError);
            return { showUserList: false, repoUser: [], selectUser: "" ,followersDetail:[], repoDetail:[], details:false, showRepo:false};
        }

        /**
         * @description Show on view all the information after resolve a succes promise
         * @param {Object} data 
         */
        function infoUsersSucces(data) {
            vm.model.repoUser = data;
            vm.model.showUserList = true;
        }

        /**
         * @description Show on view the error code after resolve a error promise
         * @param {Error} reject 
         */
        function infoUsersError(reject) {
            load.style.display = "none";
            modalService.open({url:'my-app/templates/modal-error.html', message:"Codigo de error: "+reject.staus});
        }

        function repoLaunchModal() {
            var modalInstance = modalService.open({ url: 'my-app/templates/modal-confirm.html', message: 'Si pulsas aceptar accederas a los respositorios' });
            modalInstance.result.then(modalAceptRepo, angular.noop);

        }

        function followersLaunchModal() {
            var modalInstance = modalService.open({ url: 'my-app/templates/modal-confirm.html', message: 'Si pulsas aceptar accederas a los followers' });
            modalInstance.result.then(modalAceptFollowers, angular.noop);
        }


        function modalAceptRepo() {
            gitUserService.getUsersRepos(vm.model.selectUser).then(infoUsersRepoDetailSucces, infoUsersError);
        }

        function infoUsersRepoDetailSucces(data){
            vm.model.repoDetail=data;
            vm.model.details=true;
            vm.model.showRepo=true;
        }

        function modalAceptFollowers() {
            gitUserService.getUsersFollowers(vm.model.selectUser).then(infoUsersFollowersDetailSucces, infoUsersError);
        }

        function infoUsersFollowersDetailSucces(data){
            vm.model.followersDetail=data;
            vm.model.details=true;
            vm.model.showRepo=false;
        }

        function back(){
            vm.model.details=false;
        }
        
    }


})();