'use strict';

angular.module('founders')
  .controller('mainController', ['$scope', '$http', function($scope, $http) {
    $scope.sortField = 'id';
    $scope.sortReverse  = false;
    $scope.search  = '';

    $http.get('founders.json').success(function(data) {
      $scope.founders = data;
    });
  }]);
