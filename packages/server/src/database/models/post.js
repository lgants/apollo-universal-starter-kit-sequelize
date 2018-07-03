'use strict';

export default function(sequelize, DataTypes) {
  var Post = sequelize.define(
    'Post',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING
    },
    { timestamps: true, underscored: true, freezeTableName: true }
  );
  Post.associate = function() {
    // associations can be defined here
  };
  return Post;
}
