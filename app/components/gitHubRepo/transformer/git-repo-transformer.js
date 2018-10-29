(function () {
    "use strict"
    angular.module('my-app').factory('gitRepoTransformer', Transformer);
    
    
    function Transformer () {

            var factory={
                    tranformData:tranformData
            }

            return factory;

        /**
         * Transform the repo Object in to a recognize object to the controller
         * @param {Object} repo 
         */
        function tranformData(repo) {
            var object = {
                total_count: repo.total_count,
                list: []
            }
            var elementList = repo.items;
            var i = 0, size =elementList.length;
            for (i = 0; i <size; ++i) {
                object.list.push({ 
                avatar : elementList[i].owner.avatar_url    ,
                name : elementList[i].full_name,
                url :elementList[i].html_url ,
                forks : elementList[i].forks_count,
                watcher : elementList[i].watchers_count,
                bugs : elementList[i].open_issues});
            }

            return object;
        }

    }
})();