'use strict';

export async function up(queryInterface, Sequelize) {
  return queryInterface.createTable('AuthGoogle', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    google_id: {
      type: Sequelize.STRING,
      unique: true
    },
    display_name: {
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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export async function down(queryInterface) {
  return queryInterface.dropTable('AuthGoogle');
}
