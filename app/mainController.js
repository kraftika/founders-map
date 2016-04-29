'use strict';

angular.module('founders')
  .controller('mainController', ['$scope', '$http', function($scope, $http) {
    $http.get('founders.json').success(function(data) {
      $scope.founders = data;
    });
  }]);
