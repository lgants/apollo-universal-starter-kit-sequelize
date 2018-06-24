'use strict';

// var bcrypt = require("bcryptjs");
// var Faker = require("Faker");

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'User',
      [
        {
          username: 'admin',
          email: 'admin@example.com',
          password: 'password',
          role: 'admin',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'user',
          email: 'user@example.com',
          password: 'password',
          role: 'user',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
