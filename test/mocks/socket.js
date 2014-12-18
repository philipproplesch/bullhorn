var getSocketMock = function($q, $timeout) {
  return {
    host: function() {},
    connect: function() {
      var deferred = $q.defer();

      $timeout(function() {
        deferred.resolve();
      }, 10);

      return deferred.promise;
    }
  };
};
