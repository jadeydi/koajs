const assert = require('assert');
const User  = require('../../models').User;

describe("User", function() {
  describe("#create", function() {
    it('should create valid user', function() {
      User.create({}).then(function(user) {
      }).catch(function(err) {
      });
    });
  });
});
