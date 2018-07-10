'use strict';

export default {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'Subscription',
      [
        {
          stripe_customer_id: 'test',
          stripe_subscription_id: 'test',
          stripe_source_id: 'test',
          active: true,
          expiry_month: 12,
          expiry_year: 2022,
          last4: '1111',
          brand: 'Visa',
          user_id: 1
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Subscription', null, {});
  }
};
