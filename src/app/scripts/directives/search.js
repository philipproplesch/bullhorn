angular.module('bullhorn')
  .directive('search', function($rootScope, SpotifySearch) {

    return {
      restrict: 'E',
      templateUrl: 'app/templates/search.html',
      link: function(scope) {
        scope.search = function() {
          SpotifySearch.find(scope.term).then(function(results) {
            scope.results = results;
          });
        };

        scope.selectResult = function(track) {
          $rootScope.$emit('bullhorn:selected-search-result', track);
        };

        scope.getTrackName = function(track) {
          var artist =
            track.artists
              .map(function(artist) {
                return artist.name;
              })
              .join(', ');

          return artist + ' - ' + track.name;
        };
      }
    };
  });
