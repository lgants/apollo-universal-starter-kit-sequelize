'use strict';

export default function(sequelize, DataTypes) {
  var Subscription = sequelize.define(
    'Subscription',
    {
      stripe_customer_id: { type: DataTypes.INTEGER, unique: true },
      stripe_source_id: { type: DataTypes.INTEGER, unique: true },
      stripe_subscription_id: { type: DataTypes.INTEGER, unique: true },
      active: { type: DataTypes.BOOLEAN, default: true },
      expiry_month: DataTypes.INTEGER,
      expiry_year: DataTypes.INTEGER,
      last4: DataTypes.STRING,
      brand: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: sequelize.models.User,
          key: 'id'
          // deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }
    },
    { timestamps: true, underscored: true, freezeTableName: true }
  );
  Subscription.associate = function() {
    // associations can be defined here
  };
  return Subscription;
}
