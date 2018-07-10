'use strict';

export async function up(queryInterface, Sequelize) {
  return queryInterface.createTable('AuthFacebook', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    fb_id: {
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
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
  });
}

export async function down(queryInterface) {
  return queryInterface.dropTable('AuthFacebook');
}
