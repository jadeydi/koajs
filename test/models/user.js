import assert from 'assert';
import error from '../../components/error';
import models from '../../models';

describe("models/user", function() {
  before(function(done) {
    this.user = models.user;
    models.sequelize.sync({force: true}).then(function() {
      done();
    });
  });

  describe("#create without user", function() {
    describe("#create user", function() {
      it('should not create user without attributes', function() {
        return this.user.create({}).then(function(user) {
          console.info(user)
        }).catch(function(err) {
          assert.deepEqual(['username', 'email', 'password'].sort(), error.Extract(err));
        });
      });

      it('should not create user with invalid username', function() {
        return this.user.create({username: "!yuqlee", email: "yuqlee@gmail.com", password: "password"}).then(function(user) {
          console.info(user)
        }).catch(function(err) {
          assert.deepEqual(['username'].sort(), error.Extract(err));
        });
      });

      it('should not create user with invalid email', function() {
        this.user.create({username: "yuqlee", email: "yuqleegmail.com", password: "password"}).then(function(user) {
          console.info(user)
        }).catch(function(err) {
          assert.deepEqual(['email'].sort(), error.Extract(err));
        });
      });

      it('should not create user with invalid password', function() {
        this.user.create({username: "yuqlee", email: "yuqlee@gmail.com", password: "pass"}).then(function(user) {
          console.info(user)
        }).catch(function(err) {
          assert.deepEqual(['password'].sort(), error.Extract(err));
        });
      });

      it('should create user', function() {
        return this.user.create({username: "yuqlee", email: "yuqlee@gmail.com", password: "password"}).then(function(user) {
          assert.equal(user.username, "yuqlee")
          assert.equal(user.email, "yuqlee@gmail.com")
          return user;
        }).catch(function(err) {
          console.info(err)
        });
      });
    });
  });

  describe("#update user attributes", function() {
    before(function() {
      return this.user.create({username: "yuqlii", email: "yuqlii@gmail.com", password: "password"}).then(function(user) {
        return user;
      });
    });

    describe("#Update user", function() {
      it('should failure for invalid password', function() {
        let that = this;
        async function t() {
          let user = await that.user.findOne({where: {email: "yuqlii@gmail.com"}}).then(function(user) {
            return user;
          });

          let e1 = await user.update({email: "yuq@gmail.com"}).then(function(user) {
            return user;
          }).catch(function(err) {
            return error.Extract(err);
          });

          assert.equal("yuqlii", user.name());
          assert.deepEqual(["password"], e1);
          return user;
        }
        return t();
      });

      it('should failure for invalid old_password', function() {
        return this.user.findById(2).then(function(user) {
          return user;
        }).then(function(user) {
          return user.update({password: "invalid"}).then(function(user) {
            return user;
          }).catch(function(err) {
            assert.deepEqual(["old_password"], error.Extract(err));
            return err;
          });
        });
      });

      it('should update user', function() {
        return this.user.findById(2).then(function(user) {
          assert.equal("yuqlii", user.username)
          return user;
        }).then(function(user) {
          return user.update({username: "yuqluu"}).then(function(user) {
            assert.equal("yuqluu", user.name());
            return user;
          });
        });
      });
    });
  });
});
