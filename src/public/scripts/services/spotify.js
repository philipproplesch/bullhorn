var _ = require('lodash');
var request = require('request');
var qs = require('querystring');

angular.module('bullhorn')
  .service('Spotify', function($q) {

    var initialized = $q.defer();

    var ports = _.range(4370, 4380);

    var originHeader = 'https://open.spotify.com';

    var charset = 'abcdefghijklmnopqrstuvwxyz1234567890';

    var generateRandomString = function(length) {
      var result = '';

      for (var i = length; i > 0; --i) {
        result += charset[Math.round(Math.random() * (charset.length - 1))];
      }

      return result;
    };

    var buildLocalUrl = function(port) {
      return 'https://' + svc.subDomain + '.spotilocal.com:' + port;
    };

    // Service
    var svc = {};

    var methods = {
      'open': {
        url: '/remote/open.json'
      },
      'status': {
        url: '/remote/status.json'
      },
      'version': {
        url: '/service/version.json',
        params: {
          service: 'remote'
        }
      },
      'play': {
        url: '/remote/play.json',
        params: {
          uri: undefined
        }
      },
      'pause': {
        url: '/remote/pause.json',
        params: {
          pause: undefined
        }
      }
    };

    angular.forEach(methods, function(config, method) {
      svc[method] = function() {
        var deferred = $q.defer();

        // Store ´arguments´ from this function call
        var args = arguments;

        var params = angular.copy(config.params) || {};

        var index = 0;
        for (var name in params) {
          var value = params[name];

          if (angular.isUndefined(value)) {
            params[name] = args[index];
            index++;
          }
        }

        initialized.promise.then(function() {
          svc.get(config.url, params).then(function(body) {
            deferred.resolve(JSON.parse(body));
          });
        });

        return deferred.promise;
      };
    });

    svc.determineLocalUrl = function() {
      var deferred = $q.defer();

      ports.forEach(function(port) {
        var options = {
          url: buildLocalUrl(port) + '/remote/status.json',
          headers: {
            'Origin': originHeader
          }
        };

        request(options, function(error, response, body) {
          if (response && response.statusCode === 200) {
            deferred.resolve(response.request.port);
          }
        });
      });

      return deferred.promise;
    };

    svc.getOAuthToken = function() {
      var deferred = $q.defer();

      request('http://open.spotify.com/token', function(error, response, body) {
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

      svc.get('/simplecsrf/token.json').then(function(body) {
        var obj = JSON.parse(body);
        deferred.resolve(obj.token);
      });

      return deferred.promise;
    };

    svc.get = function(path, params) {
      var deferred = $q.defer();

      var parameters = {
        'ref': '',
        'cors': ''
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
        url = svc.localUrl + url + '?' + qs.stringify(parameters);
      }

      var options = {
        url: url,
        headers: {
          'Origin': originHeader
        }
      };

      request(options, function(error, response, body) {
        deferred.resolve(body);
      });

      return deferred.promise;
    };

    svc.initialize = function() {
      svc.subDomain = generateRandomString(5);

      svc.determineLocalUrl().then(function(port) {
        svc.localUrl = buildLocalUrl(port);

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
