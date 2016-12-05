const assert = require('assert');
const User = require('../../models').User;
const errHandler = require('../../utils/error');

describe("User", function() {
  describe("#create", function() {
    it('should create valid user', function() {
      User.create({}).then(function(user) {
      }).catch(function(err) {
        assert.deepEqual(['password'], errHandler.paths(err));
      });
    });

    it('should create valid user', function() {
      User.create({password: "abc"}).then(function(user) {
      }).catch(function(err) {
        assert.deepEqual(['username', 'email', 'password'], errHandler.paths(err));
      });
    });
  });
});
