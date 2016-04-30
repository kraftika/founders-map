'use strict';

angular.module('founders')
  .controller('mainController', ['$scope', '$http', 'Upload', '$q', 'separatorService', 'csvFileService',
    function($scope, $http, Upload, $q, separatorService, csvFileService) {
    $scope.sortField = 'id';
    $scope.sortReverse  = false;
    $scope.search = '';

    $scope.separators = separatorService.getAllSeparators();
    $scope.separator = $scope.separators[0].value;

    // Remove this part when the app is ready
    // $http.get('founders.json').success(function(data) {
    //   $scope.founders = data;
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
              })
              .catch(function(failedParsing) {
                console.log('Failed file parsing:' + failedParsing);
              });
        });
      }
    };
}]);
