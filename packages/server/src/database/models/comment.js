'use strict';

var Sequelize = require('sequelize');
var models = require('./');

module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define(
    'Comment',
    {
      content: DataTypes.STRING,
      post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: models.Post,
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }
    },
    {}
  );
  Comment.associate = function() {
    // associations can be defined here
  };
  return Comment;
};
