(function(){

    angular.module('my-app').controller('gitUserFollowersCtrl',gitUserFollowersCtrl)
    gitUserFollowersCtrl.$inject =['$rootScope'];

    function gitUserFollowersCtrl($rootScope){

        var vm =this;
        vm.back=back;
        vm.userFollowerList;
        activate();

        function activate(){
            vm.userFollowerList=[];

        }

        function back() {
            $rootScope.$broadcast('user-details-back');
        }
    }
})();