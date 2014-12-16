/*jshint -W079 */

var request = require('request');

var nodeHelper = nodeHelper || {};

nodeHelper.web = {
  executeRequest: function(options, callback) {

    // http://stackoverflow.com/a/20091919
    options.rejectUnauthorized = false;

    request(options, function(error, response, body) {
      callback(error, response, body);
    });
  }
};
