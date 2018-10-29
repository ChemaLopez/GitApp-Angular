(function () {
    "use strict"
    angular.module('my-app').factory('gitUsersTransformer', Transformer);


    function Transformer() {

        var factory = {
            tranformData: tranformData,
            tranformRepos: tranformRepos,
            tranformFollowers:tranformFollowers
        }

        return factory;

        /**
        * Transform the users Object in to a recognize object to the controller
        * @param {Object} users 
        */
        function tranformData(users) {

            var i = 0, size = users.length;
            var object = [];
            for (i = 0; i < size; ++i) {
                object.push({
                    login: users[i].login,
                    avatar_url: users[i].avatar_url,
                    repos_url: users[i].repos_url,
                    followers_url: users[i].followers_url
                });
            }
            return object;
        }


        /**
       * Transform the repos Object in to a recognize object to the controller
       * @param {Object} repos 
       */
        function tranformRepos(repos) {

            var i = 0, size = repos.length;
            var object = [];
            for (i = 0; i < size && i < 20; ++i) {
                object.push({
                    name: repos[i].name,
                    description: repos[i].description,
                    forks: repos[i].forks,
                    url: repos[i].url
                });
            }
            return object;
        }



        /**
           * Transform the followers Object in to a recognize object to the controller
           * @param {Object} followers 
           */
        function tranformFollowers(followers) {

            var i = 0, size = followers.length;
            var object = [];
            for (i = 0; i < size && i < 20; ++i) {
                object.push({
                    avatar_url: followers[i].avatar_url,
                    login: followers[i].login,
                    repos_url: followers[i].repos_url,
                    id: followers[i].id,

                });
            }
            return object;
        }
    }
})();
