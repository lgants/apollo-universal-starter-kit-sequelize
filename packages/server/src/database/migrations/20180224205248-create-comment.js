'use strict';

export async function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Comment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    post_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Post',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    content: {
      type: Sequelize.STRING
    }
  });
}

export async function down(queryInterface) {
  return queryInterface.dropTable('Comment');
}
