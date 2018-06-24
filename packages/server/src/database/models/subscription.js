'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subscription = sequelize.define(
    'Subscription',
    {
      stripe_customer_id: DataTypes.INTEGER,
      stripe_source_id: DataTypes.INTEGER,
      stripe_subscription_id: DataTypes.INTEGER,
      active: DataTypes.BOOLEAN,
      expiry_month: DataTypes.INTEGER,
      expiry_year: DataTypes.INTEGER,
      last4: DataTypes.STRING,
      brand: DataTypes.STRING,
      user_id: DataTypes.INTEGER
    },
    {}
  );
  Subscription.associate = function() {
    // associations can be defined here
  };
  return Subscription;
};
