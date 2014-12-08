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
      }
    };
  });
