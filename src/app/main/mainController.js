'use strict';

angular.module('founders')
  .controller('mainController', ['$scope', '$http', 'Upload', 'separatorService', 'fileService', 'mapService',
    function($scope, $http, Upload, separatorService, csvFileService, mapService) {

    $scope.sortField = 'id';
    $scope.sortReverse  = false;
    $scope.search = '';

    $scope.separators = separatorService.getAllSeparators();
    $scope.separator = $scope.separators[0].value;
    mapService.initMap();

    // To be removed when the job is done
    // $http.get('founders.json').success(function(data) {
    //   $scope.founders = data;
    //   mapService.initMap();
    //   mapService.displayAllMarkers($scope.founders);
    // });

    $scope.selectedSeparator = function(item) {
      $scope.separator = item.value;
    };

    $scope.changeMarkerState = function(founder) {
      founder.visible = !founder.visible;
      if (founder.visible) {
        mapService.showMarker(founder.id);
      } else {
        mapService.hideMarker(founder.id);
      }
    };

    $scope.addMarkerColumn = function(item) {
      mapService.addColumnAsMarker(item);
      mapService.displayAllMarkers($scope.founders);
    };

    $scope.upload = function (file) {
      if (file){
        Upload.upload({
          url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
          data: { file: file, 'username': $scope.username }
        })
        .then(function (resp) {
          csvFileService.readFile(resp.config.data.file, $scope.separator)
            .then(function(parsedData) {
              $scope.founders = parsedData;
              mapService.displayAllMarkers($scope.founders);
            })
            .catch(function(failedParsing) {
              console.log('Failed file parsing:' + failedParsing);
            });
        });
      }
    };
}]);
