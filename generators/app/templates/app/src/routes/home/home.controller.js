/**
 * Created by kwhiteside on 7/29/2016.
 */
(function () {
    'use strict';

    angular
        .module('<%= app_name %>')
        .controller('HomeController', HomeController);

    HomeController.$inject = [];

    /* @ngInject */
    function HomeController() {
        var vm = this;
        vm.string = "A string!";
        vm.number = 123;


        activate();

        ////////////////

        function activate() {

        }
    }

})();


