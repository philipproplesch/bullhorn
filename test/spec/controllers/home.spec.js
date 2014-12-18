describe('HomeCtrl', function() {
  beforeEach(module('bullhorn'));

  var HomeCtrl, rootScope, scope, q, state, socket;
  beforeEach(inject(function ($controller, $rootScope, $state, $q, $timeout, $templateCache) {
    q = $q;
    state = $state;

    rootScope = $rootScope;
    scope = $rootScope.$new();

    socket = getSocketMock($q, $timeout);

    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope,
      Socket: socket
    });

    $templateCache.put('app/templates/listen.html', '');
  }));

  describe('#host()', function() {
    it('should start the socket', function() {
      var spy = sinon.spy(socket, 'host');

      scope.host();

      expect(spy.called).to.be.true();
    });

    it('should change the state to `listen`', function() {
      var spy = sinon.spy(state, 'go');

      scope.host();

      expect(spy.called).to.be.true();
    });
  });

  describe('#connect()', function() {
    it('should connect to the socket', function() {
      var spy = sinon.spy(socket, 'connect');

      scope.connect();

      expect(spy.called).to.be.true();
    });

    it('should change the state to `listen` after successful connection', function() {
      var deferred = q.defer();
      var promise = deferred.promise;

      sinon.stub(socket, 'connect', function() {
        return promise;
      });

      var spy = sinon.spy(state, 'go');

      scope.connect();

      expect(spy.called).to.be.false();

      deferred.resolve();

      rootScope.$apply();

      expect(spy.called).to.be.true();
    });
  });
});
