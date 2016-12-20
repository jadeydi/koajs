'use strict';
import randomstring from "randomstring";
import passwordHash from "password-hash";

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { is: /^[a-z0-9][a-z0-9_]+$/i, min: 3, max: 32 }
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { max: 108 }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true }
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
    salt: {
      type: DataTypes.STRING,
    },
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
      validate: {
        isLongEnough: function (val) {
          if (val.length < 6) {
            throw new Error("Please choose a longer password")
          }
        }
      }
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
          let item = new sequelize.ValidationErrorItem('password cannot be null', 'notNull Violation', 'password', null)
          let err = new sequelize.ValidationError("notNull Violation: password can't be null!", [item]);
          return sequelize.Promise.reject(err);
        }

        if (!user.isNewRecord && !!user.password && !user.validOldPassword()) {
          let item = new sequelize.ValidationErrorItem('old_password invalid', 'invalid', 'old_password', null)
          let err = new sequelize.ValidationError("old_password invalid!", [item]);
          return sequelize.Promise.reject(err);
        }

        if (!user.isNewRecord && !!user.email && !user.validPassword()) {
          let item = new sequelize.ValidationErrorItem('password cannot be null', 'invalid', 'password', null)
          let err = new sequelize.ValidationError("password invalid!", [item]);
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
