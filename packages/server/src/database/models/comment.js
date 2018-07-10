'use strict';

export default function(sequelize, DataTypes) {
  var Comment = sequelize.define(
    'Comment',
    {
      content: DataTypes.STRING
    },
    { timestamps: true, freezeTableName: true, underscored: true }
  );
  Comment.associate = function(models) {
    models.Comment.belongsTo(models.Post, {
      foreignKey: 'post_id'
    });
  };
  return Comment;
}
