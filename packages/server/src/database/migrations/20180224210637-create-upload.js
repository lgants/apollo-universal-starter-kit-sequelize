'use strict';

export async function up(queryInterface, Sequelize) {
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
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
  });
}

export async function down(queryInterface) {
  return queryInterface.dropTable('Upload');
}
