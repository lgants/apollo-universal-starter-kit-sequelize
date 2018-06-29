'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Subscription', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stripe_customer_id: {
        type: Sequelize.INTEGER,
        unique: true
      },
      stripe_source_id: {
        type: Sequelize.INTEGER,
        unique: true
      },
      stripe_subscription_id: {
        type: Sequelize.INTEGER,
        unique: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      expiry_month: {
        type: Sequelize.INTEGER
      },
      expiry_year: {
        type: Sequelize.INTEGER
      },
      last4: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'User',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('Subscription');
  }
};