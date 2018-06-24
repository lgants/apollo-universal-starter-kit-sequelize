'use strict';

const initialAmount = 5;

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'Counter',
      [
        {
          amount: initialAmount,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Counter', null, {});
  }
};
