(function () {
    "use strict"

    angular.module('my-app').service('gitRepoService', PageService);

    PageService.$inject=['httpService','gitRepoTransformer', '$q'];

    function PageService(httpService,gitRepoTransformer,$q) {

        var vm= this;
        vm.launchRepoRequest = launchRepoRequest;
        
        /**
        * @description call to the HttpService to launch a petition
        * @param {String} name 
        */
        function launchRepoRequest(name) {
            var defered = $q.defer();
            var promise = defered.promise;
            
            httpService.launchHttpRequestRepo(name).then(tranformData, defered.reject);
            function tranformData(data) {
        
                 defered.resolve( gitRepoTransformer.tranformData(data))
                 return promise;
            }

            return promise;
           
        }
    };
})();