(function () {
    'use strict'
    angular.module('my-app').controller('sortController', sortController);

    function sortController() {

        var vm = this;
        vm.sortBugs = sortBugs;
        vm.repoList;
        vm.sortWatchers = sortWatchers;
        vm.sortForks = sortForks;
        activate();

        function activate() {
            vm.showResult=false;
        }

        /**
         * @description Recive a order petition from view and order the table in fuction the selection
         */
        function sortBugs() {
            vm.repoList.list.sort(compareBugs);
        }
        function sortForks() {
            vm.repoList.list.sort(compareForks);
        }
        function sortWatchers() {
            vm.repoList.list.sort(compareWatchers);
        }

        /**
        * @description Auxiliary function used to compare and order the list in function of number of bugs
        * @param {int} firstBug 
        * @param {int} secondBug 
        */
        function compareBugs(firstBug, secondBug) {
            return parseInt(firstBug.bugs) - parseInt(secondBug.bugs);
        }

        /**
         * @description Auxiliary function used to compare and order the list in function of number of forks
         * @param {int} firstFork 
         * @param {int} secondFork 
         */
        function compareForks(firstFork, secondFork) {
            return parseInt(firstFork.forks) - parseInt(secondFork.forks);
        }
        /**
         * @description Auxiliary function used to compare and order the list in function of number of watchers
         * @param {*} firstWatcher 
         * @param {*} secondWatcher 
         */
        function compareWatchers(firstWatcher, secondWatcher) {
            return parseInt(firstWatcher.watcher) - parseInt(secondWatcher.watcher);
        }
    }

})();