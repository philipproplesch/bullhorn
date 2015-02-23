describe('MainCtrl', function() {
  beforeEach(module('bullhorn'));

  var MainCtrl, scope, spotify;
  beforeEach(inject(function ($controller, $rootScope, Spotify) {
    scope = $rootScope.$new();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });

    spotify = Spotify;
  }));

  it('should set `connected` to false initially', function() {
    expect(scope.connected).to.be.false;
  });
});
