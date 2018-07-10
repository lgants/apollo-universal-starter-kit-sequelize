'use strict';

// (queryInterface, Sequelize)

export default {
  up: queryInterface => {
    return queryInterface.bulkInsert('Counter', [
      {
        amount: 5
      }
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Counter', null, {});
  }
};
