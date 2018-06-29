'use strict';

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Upload', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        notNull: true
      },
      type: {
        type: Sequelize.STRING,
        notNull: true
      },
      size: {
        type: Sequelize.INTEGER,
        notNull: true
      },
      path: {
        type: Sequelize.STRING,
        notNull: true
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
    return queryInterface.dropTable('Upload');
  }
};
