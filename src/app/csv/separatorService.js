'use strict';

angular.module('founders')
  .factory('separatorService', function() {
    function _getAllSeparators() {
      return [{ name:',', value: ',' },
              { name:';', value: ';'},
              { name:'tab', value: '\t'}];
    }

    return {
      getAllSeparators: _getAllSeparators
    };
  });
