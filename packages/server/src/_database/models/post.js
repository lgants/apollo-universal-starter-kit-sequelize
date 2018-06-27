'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING
    },
    {}
  );
  Post.associate = function() {
    // associations can be defined here
  };
  return Post;
};
