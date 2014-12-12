describe('Utils', function() {
  beforeEach(module('bullhorn'));

  var Utils;
  beforeEach(inject(function (_Utils_) {
    Utils = _Utils_;
  }));

  describe('#generateRandomString()', function() {
    it('should return a string with the expected length', function() {
      expect(Utils.generateRandomString(0).length).to.equal(0);
      expect(Utils.generateRandomString(1).length).to.equal(1);
      expect(Utils.generateRandomString(5).length).to.equal(5);
      expect(Utils.generateRandomString(10).length).to.equal(10);
    });
  });

  describe('#querystring()', function() {
    it('should transform an object into a querystring', function() {
      var obj = {
        'first': 'foo',
        'second': 'bar',
        'third': false
      };

      var qs = Utils.querystring(obj);

      expect(qs).to.equal('first=foo&second=bar&third=false');
    });

    it('should return an empty string if the passed object is undefined', function() {
      var qs = Utils.querystring(undefined);
      expect(qs).to.equal('');
    });
  });
});
