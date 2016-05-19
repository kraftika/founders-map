'use strict';

angular.module('founders', ['ui.router', 'ngFileUpload', 'ui.bootstrap'])
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url:'/',
          templateUrl: 'app/main/main2.html',
          controller: 'mainController'
        })
        .state('fluid', {
          url:'/fluid',
          templateUrl: 'app/main/fluid.html'
        });

      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
