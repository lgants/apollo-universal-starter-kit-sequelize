'use strict';

// var Faker = require('Faker');

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'UserProfile',
      [
        {
          // first_name: await Faker.name.firstName(),
          // last_name: await Faker.name.lastName(),
          first_name: 'asdf',
          last_name: 'asdf',
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('UserProfile', null, {});
  }
};
