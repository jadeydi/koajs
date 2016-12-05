const assert = require('assert');
const errHandler = require('../../utils/error');

describe("User", function() {
  before(function () {
    return require('../../models').sequelize.sync({force: true});
  });

  beforeEach(function () {
    this.user = require('../../models').user;
  });

  describe("#create without infomation", function() {
    it('should not create user', function() {
      this.user.create({}).then(function(user) {
      }).catch(function(err) {
        assert.deepEqual(['password'], errHandler.paths(err));
      });
    });
  });

  describe("#create with invalid infomation", function() {
    it('should not create user', function() {
      it('should create valid user', function() {
        this.user.create({password: "abc"}).then(function(user) {
        }).catch(function(err) {
          assert.deepEqual(['username', 'email', 'password'], errHandler.paths(err));
        });
      });
    });
  });

  describe("#create", function() {
    it('should create valid user', function() {
      return this.user.create({username: "yuqlee", email: "yuqlee@gmail.com", password: "password"}).then(function(user) {
        assert.equal(user.username, "yuqlee")
        assert.equal(user.email, "yuqlee@gmail.com")
      }).catch(function(err) {
        console.info(err)
      });
    });
  });
});
