'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nickname: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      avatar_url: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      bio: {
        type: Sequelize.TEXT,
        defaultValue: ''
      },
      authentication_token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      encrypted_password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      salt: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('users');
  }
};

/*
CREATE DATABASE sand_dev;
CREATE UNIQUE INDEX ON users ((LOWER(username)));
ALTER TABLE users ADD CHECK (username ~* '^[a-z0-9][a-z0-9_]{3,31}$');
CREATE UNIQUE INDEX ON users ((LOWER(email)));
CREATE UNIQUE INDEX ON users (authentication_token);
*/
