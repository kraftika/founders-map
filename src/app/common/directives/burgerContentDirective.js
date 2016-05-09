angular.module('founders')
  .directive('burgerContent', function() {
    return {
      restrict: 'EA',
      transclude: true,
      templateUrl: 'app/common/directives/burgerContentTemplate.tpl.html',
      link: function() {
        var menu = document.querySelector('#menu');
        var main = document.querySelector('main');
        var drawer = document.querySelector('#drawer');

        if (!menu && !drawer && !main) {
          console.log('Cannot find one of the following elements: #menu, #drawer, main');
        }

        menu.addEventListener('click', function(e) {
          drawer.classList.toggle('open');
          e.stopPropagation();
        });

        main.addEventListener('click', function() {
          drawer.classList.remove('open');
        });
      }
    }
  });
