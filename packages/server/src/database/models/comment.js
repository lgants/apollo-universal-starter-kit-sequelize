'use strict';

export default function(sequelize, DataTypes) {
  var Comment = sequelize.define(
    'Comment',
    {
      content: DataTypes.STRING,
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: sequelize.models.Post,
          key: 'id'
          // deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }
    },
    { timestamps: true, underscored: true, freezeTableName: true }
  );
  Comment.associate = function() {
    // associations can be defined here
  };
  return Comment;
}
