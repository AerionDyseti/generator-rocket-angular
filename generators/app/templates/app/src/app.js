(function () {
    'use strict';

    angular.module('<%= app_name %>', [
            'ui.router'
        ]);

    angular.module('<%= app_name %>')
        .config(config)
        .run(run);


    /*
        Angular Configuration
     */

    config.$inject = ['$stateProvider', '$compileProvider', '$urlRouterProvider', '$locationProvider', '$urlMatcherFactoryProvider'];
    function config($stateProvider, $compileProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider)
    {

        $locationProvider.html5Mode({ enabled: true, requireBase: false });
        $urlMatcherFactoryProvider.strictMode(false);
        $compileProvider.debugInfoEnabled(true); // Change to False for Production.

        $stateProvider // Register States.

        // Home
            .state('home', {
                url: '/home',
                templateUrl: 'routes/home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'home',
                data: {
                    pageTitle: 'Home'
                }
            })

            .state('component', {
                url: '/component',
                templateUrl: 'routes/component/component.view.html',
                controller: 'ComponentController',
                controllerAs: 'component',
                data: {
                    pageTitle: 'Component'
                }
            });


        // if the path doesn't match any of the urls you configured
        // otherwise will take care of routing the user to the specified url
        $urlRouterProvider.otherwise('/home');

    }

    run.$inject = ['$rootScope'];
    function run($rootScope) {

        // Bind console so we can see angular errors more frequently.
        // $rootScope.$on("$stateChangeError", console.log.bind(console));

        // Change the page title when we change states.
         $rootScope.$on('$stateChangeSuccess', function(event, toState){
         var title = '<%= site_name %>';
         if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle + " - <%= site_name %>";
         $rootScope.pageTitle = title;
         });

    }

})();