(function () {
    'use strict';
    angular.module('my-app').config(config);

    config.$inject =['$routeProvider'];
    
    function config($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'my-app/templates/git-repo-view.html',
                controller: 'GitHubRepoController',
                controllerAs: 'gitRepoCtrl',
            }).
           when('/users', {
                templateUrl: 'my-app/templates/git-users-view.html',
                controller: 'GitUsersController',
                controllerAs: 'gitUserCtrl',
            })
            .otherwise({ redirectTo: '/' });
    }
})();