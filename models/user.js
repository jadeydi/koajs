'use strict';
import randomstring from "randomstring";
import passwordHash from "password-hash";
import validator from "validator";

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    username: DataTypes.STRING,
    nickname: type: DataTypes.STRING,
    email: type: DataTypes.STRING,
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
    salt: type: DataTypes.STRING,
    encryptedPassword: {
      type: DataTypes.STRING,
      field: 'encrypted_password'
    },
    oldPassword: {
      type: DataTypes.VIRTUAL
    },
    password: {
      type: DataTypes.VIRTUAL,
      set: function (val) {
        // Remember to set the data value, otherwise it won't be validated
        this.setDataValue('password', val);
        this.salt = randomstring.generate(16);
        this.authenticationToken = randomstring.generate({ charset: 'hex' });
        this.encryptedPassword = passwordHash.generate(this.password + this.salt)
      },
    },
  },
  {
    // { message: 'username cannot be null',
    //   type: 'notNull Violation',
    //   path: 'username',
    //   value: null }
    hooks: {
      beforeValidate: function(user, options) {
        let items = [];
        if (user.isNewRecord) {
          let password = user.password;
          if (!password || password.length < 6) {
            let item = new sequelize.ValidationErrorItem('password invalid', 'Invalid', 'password', '11001')
            items.push(item);
          }
        }
        let uv = /^[a-z0-9][a-z0-9_]+$/i;
        let username = user.username;
        // TODO unique
        if (!username || !validator.isByteLength(username, {min: 3, max: 32}) || !uv.test(username)) {
          let item = new sequelize.ValidationErrorItem('username invalid', 'Invalid', 'username', '11002')
          items.push(item);
        }
        if (!!user.nickname && validator.isByteLength(user.nickname, {max: 32})) {
          let item = new sequelize.ValidationErrorItem('nickname invalid', 'Invalid', 'nickname', '11003')
          items.push(item);
        }
        // TODO unique
        if (!user.email || !validator.isEmail(user.email)) {
          let item = new sequelize.ValidationErrorItem('email invalid', 'Invalid', 'email', '11004')
          items.push(item);
        }
        if (items.length > 0) {
          let err = new sequelize.ValidationError("User Info invalid!", items);
          return sequelize.Promise.reject(err);
        }
      },
    }
  },
  {
    underscored: true,
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
  });
  return User;
};
