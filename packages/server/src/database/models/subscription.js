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
      brand: DataTypes.STRING
    },
    { timestamps: true, freezeTableName: true, underscored: true }
  );
  Subscription.associate = function(models) {
    models.Subscription.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return Subscription;
}
