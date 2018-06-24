'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'Post',
      [...Array(20).keys()].map(ii => ({
        title: `Post title ${ii + 1}`,
        content: `Post content ${ii + 1}`,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Post', null, {});
  }
};
