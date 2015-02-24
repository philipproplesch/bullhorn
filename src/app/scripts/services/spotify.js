angular.module('bullhorn')
  .service('Spotify', function($q, Utils) {

    var initialized = $q.defer();

    var ports = _.range(4370, 4380);

    var originHeader = 'https://open.spotify.com';

    // Service
    var svc = {};

    var methods = {
      open: {
        url: '/remote/open.json'
      },
      status: {
        url: '/remote/status.json'
      },
      version: {
        url: '/service/version.json',
        params: {
          service: 'remote'
        }
      },
      play: {
        url: '/remote/play.json',
        params: {
          uri: undefined
        }
      },
      pause: {
        url: '/remote/pause.json',
        params: {
          pause: undefined
        }
      }
    };

    // Register all methods defined above
    angular.forEach(methods, function(config, method) {
      svc[method] = function() {
        var deferred = $q.defer();

        // Store ´arguments´ from this function call
        var args = arguments;

        var params = angular.copy(config.params) || {};

        var index = 0;
        for (var name in params) {
          if (params.hasOwnProperty(name)) {
            var value = params[name];

            if (angular.isUndefined(value)) {
              params[name] = args[index];
              index++;
            }
          }
        }

        initialized.promise.then(function() {
          svc.get(config.url, params).then(function(data) {
            deferred.resolve(JSON.parse(data.body));
          });
        });

        return deferred.promise;
      };
    });

    svc.get = function(path, params) {
      var deferred = $q.defer();

      var parameters = {
        ref: '',
        cors: ''
      };

      if (svc.oAuthToken && svc.csrfToken) {
        parameters.oauth = svc.oAuthToken;
        parameters.csrf = svc.csrfToken;
      }

      if (angular.isDefined(params)) {
        angular.forEach(params, function(value, key) {
          parameters[key] = value;
        });
      }

      var url = path;

      if (/^\//.test(url)) {
        url = svc.localUrl + url + '?' + Utils.querystring(parameters);
      }

      var options = {
        url: url,
        headers: {
          Origin: originHeader
        }
      };

      nodeHelper.web.executeRequest(options, function(error, response, body) {
        deferred.resolve({
          error: error,
          response: response,
          body: body
        });
      });

      return deferred.promise;
    };

    svc.buildLocalUrl = function(port) {
      return 'https://' + svc.subDomain + '.spotilocal.com:' + port;
    };

    svc.determineLocalUrl = function() {
      var deferred = $q.defer();

      ports.forEach(function(port) {
        var url = svc.buildLocalUrl(port) + '/remote/status.json';

        svc.get(url).then(function(data) {
          if (data.response && data.response.statusCode === 200) {
            deferred.resolve(data.response.request.port);
          }
        });
      });

      return deferred.promise;
    };

    svc.getOAuthToken = function() {
      var deferred = $q.defer();

      var options = {
        url: 'http://open.spotify.com/token'
      };

      nodeHelper.web.executeRequest(options,  function(error, response, body) {
        var obj = JSON.parse(body);

        // TODO: Figure out what's the reason for this
        if (obj.t === null) {
          deferred.reject();
        }

        deferred.resolve(obj.t);
      });

      return deferred.promise;
    };

    svc.getCsrfToken = function() {
      var deferred = $q.defer();

      svc.get('/simplecsrf/token.json').then(function(data) {
        var obj = JSON.parse(data.body);
        deferred.resolve(obj.token);
      });

      return deferred.promise;
    };

    svc.initialize = function() {
      svc.subDomain = Utils.generateRandomString(5);

      svc.determineLocalUrl().then(function(port) {
        svc.localUrl = svc.buildLocalUrl(port);

        $q.all([
          svc.getOAuthToken(),
          svc.getCsrfToken()
        ]).then(function(data) {

          svc.oAuthToken = data[0];
          svc.csrfToken = data[1];

          initialized.resolve();
        }, function() {
          // Try again until there is an OAuth token
          svc.initialize();
        });
      });

      return initialized.promise;
    };

    return svc;
  });
