describe('HomeCtrl', function() {
  beforeEach(module('bullhorn'));
  beforeEach(module('bullhorn-templates'));

  var HomeCtrl, rootScope, scope, q, state, socket;
  beforeEach(inject(function ($controller, $rootScope, $state, $q, $timeout) {
    q = $q;
    state = $state;

    rootScope = $rootScope;
    scope = $rootScope.$new();

    socket = getSocketMock($q, $timeout);

    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope,
      Socket: socket
    });

    scope.connected = false;
  }));

  describe('#host()', function() {
    it('should call Socket#host()', function() {
      sinon.spy(socket, 'host');

      scope.host();

      expect(socket.host.calledOnce).to.be.true;
    });

    it('should call #connect()', function() {
      sinon.stub(scope, 'connect');

      scope.host();

      expect(scope.connect.calledOnce).to.be.true;
    });
  });

  describe('#connect()', function() {
    it('should call Socket#connect()', function() {
      sinon.spy(socket, 'connect');

      scope.connect();

      expect(socket.connect.calledOnce).to.be.true;
    });

    it('should set `connected` to true on successful connection', function() {
      var deferred = q.defer();
      var promise = deferred.promise;

      sinon.stub(socket, 'connect', function() {
        return promise;
      });

      scope.connect();

      expect(scope.connected).to.be.false;

      deferred.resolve();

      rootScope.$apply();

      expect(scope.connected).to.be.true;
    });
  });

  describe('#join()', function() {
    it('should do nothing if room name is undefined', function() {
      sinon.spy(socket, 'join');

      scope.room = undefined;
      scope.join();

      expect(socket.join.called).to.be.false;
    });

    it('should do nothing if room name is empty', function() {
      sinon.spy(socket, 'join');

      scope.room = '';
      scope.join();

      expect(socket.join.called).to.be.false;
    });

    it('should call Socket#join() if a room name is present', function() {
      sinon.spy(state, 'go');

      var deferred = q.defer();
      var promise = deferred.promise;

      sinon.stub(socket, 'join', function() {
        return promise;
      });

      scope.room = 'foo';
      scope.join();

      deferred.resolve();

      rootScope.$apply();

      expect(state.go.calledOnce).to.be.true;
      expect(state.go.getCall(0).args[0]).to.equal('listen');
    });
  });
});
