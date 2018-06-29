'use strict';

const initialAmount = 5;
// (queryInterface, Sequelize)

export default {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'Counter',
      [
        {
          amount: initialAmount
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Counter', null, {});
  }
};
