(function () {

    angular.module('my-app').controller('gitTableCtrl', gitTableCtrl);

    gitTableCtrl.$inject = ['$rootScope']
    function gitTableCtrl($rootScope) {

        var vm = this;
        vm.selectUser;
        vm.userList;
        
        activate();
        function activate() {
            vm.userList=[];
            vm.selectUser="";
        }
        vm.reposModal = reposModal;
        vm.followersModal = followersModal;

        function reposModal() {
            $rootScope.$broadcast('repo-launch-Modal' );
        }


        function followersModal() {
            $rootScope.$broadcast('followers-launch-Modal');

        }

    }
})();