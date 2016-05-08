'use strict';

angular.module('founders')
  .controller('mainController', ['$scope', '$http', 'Upload', 'separatorService', 'fileService', 'mapService', '$nlDrawer', '$nlFramework',
    function($scope, $http, Upload, separatorService, csvFileService, mapService, $nlDrawer, $nlFramework) {

    // Native-like Drawer is HERE! ---------------------------
var nlOptions = {
      // // global settings
      // speed: 0.2,
      // animation: 'ease',
      // // use action button
      // fab: true,
      // // use toast messages
      // toast: true,
      // // burger specific
      // burger: {
      //   endY: 6,
      //   startScale: 1, // X scale of bottom and top line of burger menu at starting point (OFF state)
      //   endScale: 0.7 // X scale of bottom and top line of burger menu at end point (ON state)
      // },
      // // content specific
      content:{
        modify: true, // modify content width and heidht?
        topBarHeight: 56 //topbar height to use when modify is set to true
      },
      // drawer specific
      // drawer: {
      //   maxWidth: 300,
      //   openCb: function(){
      //     console.log('nlDrawer: openned')
      //   },
      //   closeCb: function(){
      //     console.log('nlDrawer closed')
      //   }
      // }
    }

    $scope.drawer = $nlFramework.drawer;
// $nlFramework.set( nlOptions );
$nlFramework.init( nlOptions );
  // Done! -------------------------------------------------

    $scope.showDrawer = function() {
      $nlDrawer.show();
    };

    $scope.hideDrawer = function() {
      $nlDrawer.hide();
    };


    $scope.sortField = 'id';
    $scope.sortReverse  = false;
    $scope.search = '';

    $scope.separators = separatorService.getAllSeparators();
    $scope.separator = $scope.separators[0];

    mapService.initMap();

    // To be removed when the job is done
    // $http.get('founders.json').success(function(data) {
    //   $scope.founders = data;
    //   mapService.initMap();
    //   mapService.displayAllMarkers($scope.founders);
    // });

    $scope.selectedSeparator = function(item) {
      $scope.separator = item;
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
