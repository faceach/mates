'use strict';

describe('mates.version module', function() {
  beforeEach(module('mates.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
