'use strict';
const randomstring = require("randomstring");
const passwordHash = require('password-hash');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[a-z0-9][a-z0-9_]+$/i,
        min: 3,
        max: 32
      },
      unique: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        max: 108,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: true
    },
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
    encryptedPassword: {
      type: DataTypes.STRING,
      field: 'encrypted_password'
    },
    password: {
      type: DataTypes.VIRTUAL,
      set: function (val) {
        // Remember to set the data value, otherwise it won't be validated
        this.setDataValue('password', val);
      },
      validate: {
        isLongEnough: function (val) {
          if (val.length < 6) {
            throw new Error("Please choose a longer password")
          }
        }
      }
    },
    salt: {
      type: DataTypes.STRING,
    },
  },
  {
    // { message: 'username cannot be null',
    //   type: 'notNull Violation',
    //   path: 'username',
    //   value: null }
    hooks: {
      beforeValidate: function(user, options) {
        if (!user.password && user.isNewRecord) {
          let err = new sequelize.ValidationError("notNull Violation: password can't be null!", [{
            message: 'password cannot be null',
            type: 'notNull Violation',
            path: 'password',
            value: null
          }]);
          return sequelize.Promise.reject(err);
        }
      },
      beforeCreate: function(user, options) {
        user.salt = randomstring.generate(16);
        user.authenticationToken = randomstring.generate({ charset: 'hex' });
        user.encryptedPassword = passwordHash.generate(user.password + user.salt)
      }
    }
  },
  {
    underscored: true,
    instanceMethods: {
      name: function() {
        return this.nickname || this.username
      }
    }
  });
  return User;
};
