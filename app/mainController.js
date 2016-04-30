'use strict';

angular.module('founders')
  .controller('mainController', ['$scope', '$http', 'Upload', '$q',
    function($scope, $http, Upload, $q) {
    $scope.sortField = 'id';
    $scope.sortReverse  = false;
    $scope.search = '';
    $scope.separators = [{name:',', value:','},
                         {name:';', value:';'},
                         {name:'tab', value:'\t'}];
    $scope.separator = $scope.separators[0].value;

    // $http.get('founders.json').success(function(data) {
    //   $scope.founders = data;
    // });

    $scope.selectedSeparator = function(item) {
      $scope.separator = item.value;
    };

    function firstToUpperCase(str) {
      return str.substr(0, 1).toLowerCase() + str.substr(1);
    }

    function csvToJSON(content) {
      var lines=content.csv.split('\n');
      var result = [];
      var start = 0;
      var columnCount = lines[0].split(content.separator).length;

      var headers = [];
      if (content.header) {
        headers=lines[0].split(content.separator);
        start = 1;
      }

      for (var i=start; i<lines.length; i++) {
        var obj = {};
        var currentline=lines[i].split(new RegExp(content.separator+'(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));
        if ( currentline.length === columnCount ) {
          if (content.header) {
            for (var j=0; j<headers.length; j++) {
              // To be remove in function
              headers[j] = firstToUpperCase(headers[j].replace(/^[^0-9a-zA-Z]+|[^0-9a-zA-Z_-]+/g, ''));
              obj[headers[j]] = currentline[j];
            }
          } else {
            for (var k=0; k<currentline.length; k++) {
              obj[k] = currentline[k];
            }
          }
          result.push(obj);
        }
      }
      return result;
    }

    function readFile(file, separator) {
      var deferred = $q.defer();
      var reader = new FileReader();
      var error = { hasError: false };
      var parsedResult;

      reader.onload = function() {
        try{
           var content = {
            csv: reader.result,
            header: true,
            separator: separator,
            result: null,
            encoding: 'ISO-8859-1'
          };

          parsedResult = csvToJSON(content);
        }
        catch(e) {
          error.hasErrors = true;
          error.message = e;
        }

        if (error.hasErrors) {
          deferred.reject(error.message);
        } else {
          deferred.resolve(parsedResult);
        }
      };

      reader.readAsText(file);
      return deferred.promise;
    }

    // upload on file select or drop
    $scope.upload = function (file) {
      if (file){
        Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: { file: file, 'username': $scope.username }
        }).then(function (resp) {
            readFile(resp.config.data.file, $scope.separator)
              .then(function(parsedData) {
                console.log(parsedData);
                $scope.founders = parsedData;
              })
              .catch(function(failedParsing) {
                console.log('Failed file parsing:' + failedParsing);
              });
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
      }
    };
}]);
