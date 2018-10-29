(function () {
    "use strict"

    angular.module('my-app').factory('proxyService', ProxyService);

    ProxyService.$inject = ['$q','$http'];



    function ProxyService( $q, $http) {


        var factory = {
            launchRepoPetition: launchRepoPetition,
            launchUsersPetition: launchUsersPetition,
            launchUserDataPetition:launchUserDataPetition
        }
        return factory;

        /**
         * @description launch the Http petition to GitHub for obtain the repositories
         * @param {String} repoName 
         */
        function launchRepoPetition(repoName) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get("https://api.github.com/search/repositories?q=" + repoName).then(function(data) {
                defered.resolve(data.data);
            },function(err) {
                defered.reject(err)
            });

            return promise;
        }

         /**
         * @description launch the Http petition to GitHub for obtain a user list
         */
        function launchUsersPetition() {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get("https://api.github.com/users").then(function(data) {
                defered.resolve(data.data);
            },function(err) {
                defered.reject(err)
            });

            return promise;
        }
          /**
         * @description launch the Http petition to GitHub for obtain a user data
         */
        function launchUserDataPetition(url) {
            var defered = $q.defer();
            var promise = defered.promise;
            $http.get(url).then(function(data) {
                defered.resolve(data.data);
            },function(err) {
                defered.reject(err)
            });

            return promise;
        }

        
    }
})();