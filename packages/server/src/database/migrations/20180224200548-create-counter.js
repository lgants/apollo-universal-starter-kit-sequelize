'use strict';

export async function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Counter', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    amount: {
      type: Sequelize.INTEGER
    }
  });
}

export async function down(queryInterface) {
  return queryInterface.dropTable('Counter');
}
