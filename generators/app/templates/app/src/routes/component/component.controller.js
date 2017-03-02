/**
 * Created by kwhiteside on 7/29/2016.
 */
(function () {
    'use strict';

    angular
        .module('<%= app_name %>')
        .controller('ComponentController', ComponentController);

    ComponentController.$inject = [];

    /* @ngInject */
    function ComponentController() {
        var vm = this;
        vm.string = "Yet another string!";
        vm.number = 321;

        activate();

        ////////////////

        function activate() {

        }
    }

})();

