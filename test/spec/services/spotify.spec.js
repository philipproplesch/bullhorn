describe('Spotify', function() {
  beforeEach(module('bullhorn'));

  var Spotify, rootScope, q;

  beforeEach(inject(function (_Spotify_, _$rootScope_, _$q_) {
    Spotify = _Spotify_;
    rootScope = _$rootScope_;
    q = _$q_;

    // Create context
    Spotify.subDomain = 'foo';
  }));

  describe('#buildLocalUrl()', function() {
    it('should return a valid local URL', function() {
      var url = Spotify.buildLocalUrl(4711);
      expect(url).to.equal('https://foo.spotilocal.com:4711');
    });
  });

  describe('#determineLocalUrl()', function() {
    var deferred, promise;

    beforeEach(function() {
      deferred = q.defer();
      promise = deferred.promise;

      sinon.stub(Spotify, 'get', function() {
        return promise;
      });
    });

    it('should call #get() multiple times', function() {
      Spotify.determineLocalUrl();

      for (var i = Spotify.get.callCount - 1; i >= 0; i--) {
        var call = Spotify.get.getCall(i);
        expect(call.args[0]).to.match(/^https:\/\/foo.spotilocal.com:\d{4}\/remote\/status.json$/);
      }

      expect(Spotify.get.callCount).to.be.above(1);
    });

    it('should resolve the promise if the response is successful', function() {
      var port;
      Spotify.determineLocalUrl().then(function(data) {
        port = data;
      });

      expect(port).to.be.undefined;

      deferred.resolve({
        response: {
          statusCode: 200,
          request: {
            port: 4711
          }
        }
      });

      rootScope.$apply();

      expect(port).to.not.be.undefined;
      expect(port).to.equals(4711);
    });

    it('should do nothing if the response is not successful', function() {
      var port;
      Spotify.determineLocalUrl().then(function(data) {
        port = data;
      });

      expect(port).to.be.undefined;

      deferred.resolve({
        response: {
          statusCode: 500
        }
      });

      rootScope.$apply();

      expect(port).to.be.undefined;
    });
  });

  describe('#getOAuthToken()', function() {
    it('...', function() {
      Spotify.getOAuthToken();
    });
  });
});
