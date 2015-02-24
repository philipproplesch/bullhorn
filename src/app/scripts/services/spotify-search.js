angular.module('bullhorn')
  .service('SpotifySearch', function($q, $http) {

    var baseUrl = 'https://api.spotify.com/v1/search?type=track&q=';

    // Service
    var svc = {};

    svc.find = function(term) {
      var deferred = $q.defer();

      var items = [];

      var fetchAllResults = function(url) {
        $http.get(url).success(function(data) {
          items = items.concat(data.tracks.items);

          if (data.tracks && data.tracks.next) {
            fetchAllResults(data.tracks.next);
          }
          else {
            deferred.resolve(items);
          }
        });
      };

      fetchAllResults(baseUrl + term);

      return deferred.promise;
    };

    return svc;
  });
