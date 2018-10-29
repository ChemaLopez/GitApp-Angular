(function(){

    angular.module('my-app').component('gitUsersTable', {

        templateUrl: 'my-app/templates/git-users-table.html',
        controller: 'gitTableCtrl',
        controllerAs: 'tableCtrl',
        bindings: {
            userList: '<',
            selectUser: '='
        }

    });
})();