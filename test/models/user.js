import assert from 'assert';
import error from '../../components/error';

describe("models/user", function() {
  before(function () {
    require('../../models').sequelize.sync({force: true});
    this.user = require('../../models').user;
  });

  describe("#create with invalid attributes", function() {
    it('should not create user', function() {
      this.user.create({}).then(function(user) {
        console.info(user)
      }).catch(function(err) {
        assert.deepEqual(['username', 'email', 'password'].sort(), error.Extract(err));
      });
    });
  });

  describe("#create with invalid attributes", function() {
    it('should not create user', function() {
      this.user.create({username: "!yuqlee", email: "yuqlee@gmail.com", password: "password"}).then(function(user) {
        console.info(user)
      }).catch(function(err) {
        assert.deepEqual(['username'].sort(), error.Extract(err));
      });
    });
  });

  describe("#create with invalid attributes", function() {
    it('should not create user', function() {
      this.user.create({username: "yuqlee", email: "yuqleegmail.com", password: "password"}).then(function(user) {
        console.info(user)
      }).catch(function(err) {
        assert.deepEqual(['email'].sort(), error.Extract(err));
      });
    });
  });

  describe("#create with invalid attributes", function() {
    it('should not create user', function() {
      this.user.create({username: "yuqlee", email: "yuqlee@gmail.com", password: "pass"}).then(function(user) {
        console.info(user)
      }).catch(function(err) {
        assert.deepEqual(['password'].sort(), error.Extract(err));
      });
    });
  });

  describe("#create", function() {
    it('should create valid user', function() {
      this.user.create({username: "yuqlee", email: "yuqlee@gmail.com", password: "password"}).then(function(user) {
        assert.equal(user.username, "yuqlee")
        assert.equal(user.email, "yuqlee@gmail.com")
        return user
      }).catch(function(err) {
        console.info(err)
      });
    });
  });
});
