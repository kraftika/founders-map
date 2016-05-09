'use strict';

angular.module('founders', ['ui.router', 'ngFileUpload', 'ui.bootstrap', 'snap'])
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url:'/',
          templateUrl: 'app/main/main.html',
          controller: 'mainController'
        })
        .state('snap', {
          url:'/snap',
          templateUrl: 'app/main/snap.html'
        })
        .state('offcanvas', {
          url:'/offcanvas',
          templateUrl: 'app/main/offcanvas.html'
        })
        .state('oca', {
          url:'/offc',
          templateUrl: 'app/main/offc.html'
        });

      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
