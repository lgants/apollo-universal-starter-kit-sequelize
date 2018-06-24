'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define(
    'Comment',
    {
      post_id: DataTypes.INTEGER,
      content: DataTypes.STRING
    },
    {}
  );
  Comment.associate = function() {
    // associations can be defined here
  };
  return Comment;
};
