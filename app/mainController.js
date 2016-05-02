'use strict';

angular.module('founders')
  .controller('mainController', ['$scope', '$http', 'Upload', '$q', 'separatorService', 'csvFileService',
    function($scope, $http, Upload, $q, separatorService, csvFileService) {

    /**
      table
    */
    $scope.sortField = 'id';
    $scope.sortReverse  = false;
    $scope.search = '';

    $scope.separators = separatorService.getAllSeparators();
    $scope.separator = $scope.separators[0].value;

    var markersList = [];
    // Define map
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    // Remove this part when the app is ready
    $http.get('founders.json').success(function(data) {
      $scope.founders = data;

        // Add markers on the map
        var marker;
        var bounds = new google.maps.LatLngBounds();
        var l = $scope.founders.length;
        for(var i = 0; i < l; i++) {
          var founder = $scope.founders[i];
          var positionMarker = {
            lat: founder.garageLatitude, lng: founder.garageLongitude
          };

          marker = new google.maps.Marker({
            position: positionMarker,
            label: { text: 'Tell me' },
            title: 'Hello World!'
          });

          bounds.extend(new google.maps.LatLng(founder.garageLatitude, founder.garageLongitude));
          marker.setMap(map);
          markersList.push(founder);
        }

        map.fitBounds(bounds);
    });

    $scope.selectedSeparator = function(item) {
      $scope.separator = item.value;
    };
}]);
