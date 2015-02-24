angular.module('bullhorn')
  .service('Utils', function() {

    var charset = 'abcdefghijklmnopqrstuvwxyz1234567890';

    return {
      generateRandomString: function(length) {
        var result = '';

        for (var i = length; i > 0; --i) {
          result += charset[Math.round(Math.random() * (charset.length - 1))];
        }

        return result;
      },

      querystring: function(obj) {
        var qs = [];

        for (var property in obj) {
          /* istanbul ignore else  */
          if (obj.hasOwnProperty(property)) {
            qs.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
          }
        }

        return qs.join('&');
      }
    };
  });
