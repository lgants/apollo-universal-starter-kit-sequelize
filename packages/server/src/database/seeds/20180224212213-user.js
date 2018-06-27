'use strict';

// var bcrypt = require("bcryptjs");
// var Faker = require("Faker");
var bcrypt = require('bcryptjs');

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'User',
      [
        {
          username: 'admin',
          email: 'admin@example.com',
          password: await bcrypt.hash('admin', 12),
          role: 'admin',
          is_active: true
        },
        {
          username: 'user',
          email: 'user@example.com',
          password: await bcrypt.hash('user', 12),
          role: 'user',
          is_active: true
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
