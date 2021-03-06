'use strict';
import randomstring from "randomstring";
import passwordHash from "password-hash";
import validator from "validator";
import error from "../components/error";

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    username: DataTypes.STRING,
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    avatarUrl: {
      type: DataTypes.STRING,
      field: 'avatar_url'
    },
    authenticationToken: {
      type: DataTypes.STRING,
      field: 'authentication_token',
      unique: true
    },
    bio: DataTypes.TEXT,
    salt: DataTypes.STRING,
    encryptedPassword: {
      type: DataTypes.STRING,
      field: 'encrypted_password'
    },
    oldPassword: {
      type: DataTypes.VIRTUAL
    },
    password: {
      type: DataTypes.VIRTUAL
    },
  },
  {
    // { message: 'username cannot be null',
    //   type: 'notNull Violation',
    //   path: 'username',
    //   value: null }
    hooks: {
      beforeValidate: function(user, options) {
        let items = [], promises = [], password = user.password;
        if (user.isNewRecord) {
          if (!password || password.length < 6) {
            items.push(error.InvalidError(sequelize, "password"));
          }
        }
        if (!user.isNewRecord) {
          if (user.changed('email') && (!user.validPassword() || !user.validOldPassword())) {
            items.push(error.InvalidError(sequelize, "password"));
          }
          if (user.changed('password') && (!user.validPassword() || !user.validOldPassword())) {
            items.push(error.InvalidError(sequelize, "old_password"));
          }
        }
        let uv = /^[a-z0-9][a-z0-9_]+$/i, username = user.username;
        if (!username || !validator.isByteLength(username, {min: 3, max: 32}) || !uv.test(username)) {
          items.push(error.InvalidError(sequelize, "username"));
        }
        if (user.changed('username')) {
          let existence = user.Model.findOne({where: {"username": user.username}}).then(function(existence) {
            if (!!existence) {
              return error.UniqueError(sequelize, "username");
            }
          });
          promises.push(existence);
        }
        if (!!user.nickname && validator.isByteLength(user.nickname, {max: 32})) {
          items.push(error.InvalidError(sequelize, "nickname"));
        }
        if (!user.email || !validator.isEmail(user.email)) {
          items.push(error.InvalidError(sequelize, "email"));
        }
        if (user.changed('email')) {
          let existence = user.Model.findOne({where: {"email": user.email}}).then(function(existence) {
            if (!!existence) {
              return error.UniqueError(sequelize, "email");
            }
          });
          promises.push(existence);
        }
        return Promise.all([...items, ...promises]).then(values => {
          values = values.filter(function(n){ return n != undefined })
          if (values.length > 0) {
            return sequelize.Promise.reject(new sequelize.ValidationError("User Info Invalid!", values));
          }
        });
      },
      afterValidate: function(user, options) {
        if (user.changed('password')) {
          user.salt = randomstring.generate(16);
          user.authenticationToken = randomstring.generate({ charset: 'hex' });
          user.encryptedPassword = passwordHash.generate(user.password + user.salt);
        }
      },
    },

    instanceMethods: {
      name: function() {
        return this.nickname || this.username
      },
      validPassword: function() {
        return passwordHash.verify(this.password + this.salt, this.encryptedPassword)
      },
      validOldPassword: function() {
        return passwordHash.verify(this.oldPassword + this.salt, this.encryptedPassword)
      },
    }
  },
  {
    underscored: true,
  });
  return User;
};
