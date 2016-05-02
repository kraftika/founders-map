'use strict';

angular.module('founders')
  .controller('mainController', ['$scope', '$http', 'Upload', '$q', 'separatorService', 'csvFileService', 'mapService',
    function($scope, $http, Upload, $q, separatorService, csvFileService, mapService) {
    /**
      table
    */
    $scope.sortField = 'id';
    $scope.sortReverse  = false;
    $scope.search = '';

    $scope.separators = separatorService.getAllSeparators();
    $scope.separator = $scope.separators[0].value;

    // To be removed -
    // $http.get('founders.json').success(function(data) {
    //   $scope.founders = data;
    //   mapService.initMap();
    //   mapService.displayAllMarkers($scope.founders);
    // });

    $scope.selectedSeparator = function(item) {
      $scope.separator = item.value;
    };

    $scope.upload = function (file) {
      if (file){
        Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: { file: file, 'username': $scope.username }
        }).then(function (resp) {
            csvFileService.readFile(resp.config.data.file, $scope.separator)
              .then(function(parsedData) {
                $scope.founders = parsedData;
                  mapService.initMap();
                  mapService.displayAllMarkers($scope.founders);
              })
              .catch(function(failedParsing) {
                console.log('Failed file parsing:' + failedParsing);
              });
        });
      }
    };
}]);
