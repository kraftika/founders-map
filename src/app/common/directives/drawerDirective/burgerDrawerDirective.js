angular.module('founders')
  .directive('burgerDrawer', function() {
    return {
      restrict: 'EA',
      transclude: true,
      templateUrl: 'app/common/directives/drawerDirective/burgerDrawerTemplate.tpl.html',
      link: function() {
        var closeDrawer = document.querySelector('#closeDrawerButton');
        var drawer = document.querySelector('#drawer');

        closeDrawer.addEventListener('click', function() {
          drawer.classList.remove('open');
        });
      }
    }
  });
