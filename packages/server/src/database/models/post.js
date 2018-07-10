'use strict';

export default function(sequelize, DataTypes) {
  var Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING
    },
    { timestamps: true, freezeTableName: true, underscored: true }
  );
  Post.associate = function() {
    // associations can be defined here
  };
  return Post;
}
