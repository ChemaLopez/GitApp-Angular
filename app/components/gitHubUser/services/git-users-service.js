(function () {
    "use strict"

    angular.module('my-app').service('gitUserService', gitUsersService);

    gitUsersService.$inject=['httpService','gitUsersTransformer', '$q'];


    function gitUsersService(httpService, gitUsersTransformer,$q){

        var vm=this;

        vm.getUsers = getUsers;
        vm.getUsersFollowers = getUsersFollowers;
        vm.getUsersRepos = getUsersRepos;
    
        /**
        * @description call to the HttpService to launch a petition and get a GitHub User list
        */
        function getUsers(){
            var defered = $q.defer();
            var promise = defered.promise;
            
            httpService.launchHttpRequestUser().then(tranformData, defered.reject);
            function tranformData(data) {
        
                 defered.resolve( gitUsersTransformer.tranformData(data))
                 return promise;
            }
            return promise;
        }

          /**
        * @description call to the HttpService to launch a petition and get a GitHub a repolitory list for on user
        */
       function getUsersRepos(url){
        var defered = $q.defer();
        var promise = defered.promise;
        
        httpService.launchHttpRequestUserData(url).then(tranformData, defered.reject);
        function tranformData(data) {
    
             defered.resolve( gitUsersTransformer.tranformRepos(data))
             return promise;
        }
        return promise;
    }

     /**
        * @description call to the HttpService to launch a petition and get a GitHub a followers list for on user
        */
       function getUsersFollowers(url){
        var defered = $q.defer();
        var promise = defered.promise;
        
        httpService.launchHttpRequestUserData(url).then(tranformData, defered.reject);
        function tranformData(data) {
             defered.resolve( gitUsersTransformer.tranformFollowers(data))
             return promise;
        }
        return promise;
       
    }

    }


})();