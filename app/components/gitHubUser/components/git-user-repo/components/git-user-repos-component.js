(function(){

    angular.module('my-app').component('gitUserRepoDetail', {

        templateUrl: 'my-app/templates/git-user-repo-detail.html',
        controller: 'gitUserRepoCtrl',
        controllerAs: 'tableCtrl',
        bindings: {
            userRepoList: '<',
        }

    });
})();