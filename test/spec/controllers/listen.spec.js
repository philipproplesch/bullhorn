describe('ListenCtrl', function() {
  beforeEach(module('bullhorn'));

  var ListenCtrl, scope, spotify;
  beforeEach(inject(function ($controller, $rootScope, Spotify) {
    scope = $rootScope.$new();

    ListenCtrl = $controller('ListenCtrl', {
      $scope: scope
    });

    spotify = Spotify;
  }));

  describe('#pause()', function() {
    it('should call #pause() on the Spotify service', function() {
      sinon.stub(spotify, 'pause');

      scope.status = {
        playing: true
      };

      scope.pause();

      expect(spotify.pause.called).to.be.true();
    });
  });

  describe('#play()', function() {
    it('should call #play() on the Spotify service', function() {
      sinon.stub(spotify, 'play');

      scope.play();

      expect(spotify.play.called).to.be.true();
    });
  });
});
