'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'Comment',
      [...Array(20).keys()].map(ii => ({
        post_id: 1,
        content: `Comment title ${ii + 1} for post ${ii}`
      })),
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Comment', null, {});
  }
};
