(function () {
    "use strict"

    angular.module('my-app').service('httpService', HttpService);

    HttpService.$inject = ['proxyService', '$q'];

    function HttpService(proxyService, $q) {

        var vm = this;
        vm.launchHttpRequestRepo = launchHttpRequestRepo;
        vm.launchHttpRequestUser = launchHttpRequestUser;
        vm.launchHttpRequestUserData =launchHttpRequestUserData;
        /**
         * @description call to proxy service for launch a Http Request 
         * @param {String} repoName 
         */
        function launchHttpRequestRepo(repoName) {
            var defered = $q.defer();
            var promise = defered.promise;
            proxyService.launchRepoPetition(repoName).then(defered.resolve, defered.reject);
            return promise;
        }
        /**
     * @description call to proxy service for launch a Http Request for the users
     */
        function launchHttpRequestUser() {
            var defered = $q.defer();
            var promise = defered.promise;
            proxyService.launchUsersPetition().then(defered.resolve, defered.reject);
            return promise;
        }

    /**
     * @description call to proxy service for launch a Http Request for obtain user's data
     */
    function launchHttpRequestUserData(url) {
        var defered = $q.defer();
        var promise = defered.promise;
        proxyService.launchUserDataPetition(url).then(defered.resolve,defered.reject);
        return promise;
    }
    
             /**
             * @description Capture the error code and launch a error message
             * @param {Status} requestStatus 
             */
            function requestError(requestStatus) {
     
                switch (requestStatus.status) {
                    case -1:
                        defered.reject("No internet")
                        return promise;
                    case 400:
                        defered.reject("Bad Request")
                        return promise;
                    case 401:
                        defered.reject("Unauthorized")
                        return promise;
                    case 403:
                        defered.reject("Forbidden")
                        return promise;
                    case 404:
                        defered.reject("Not found")
                        return promise;
                    case 407:
                        defered.reject("Proxy Authentication Required")
                        return promise;
                    case 408:
                        defered.reject("Time out")
                        return promise;
                    case 451:
                        defered.reject("Unavaible for legal reason")
                        return promise;
                    case 500:
                        defered.reject("Internal server error")
                        return promise;
                    case 502:
                        defered.reject("Bad Gateway")
                        return promise;
                    case 505:
                        defered.reject("Http version not supported")
                        return promise;
                    case 511:
                        defered.reject("Network Authentication Required")
                        return promise;
                    default:
                        defered.reject("Unknow error" +defered.status)
                        return promise;
                }
            }
        }

})();