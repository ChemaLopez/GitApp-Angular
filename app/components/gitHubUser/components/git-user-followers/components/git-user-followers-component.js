(function(){

    angular.module('my-app').component('gitUserFollowersDetail', {

        templateUrl: 'my-app/templates/git-user-followers-detail.html',
        controller: 'gitUserFollowersCtrl',
        controllerAs: 'tableCtrl',
        bindings: {
            userFollowerList: '<',
        }

    });
})();