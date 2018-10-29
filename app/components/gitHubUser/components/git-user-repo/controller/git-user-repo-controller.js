(function(){

    angular.module('my-app').controller('gitUserRepoCtrl',gitUserRepoCtrl)

    gitUserRepoCtrl.$inject =['$rootScope'];

    function gitUserRepoCtrl($rootScope){

        var vm =this;
        vm.back=back;
        vm.userRepoList;
        activate();

        function activate(){
            vm.userRepoList=[];

        }


        function back() {
            $rootScope.$broadcast('user-details-back');
        }

    }
})();