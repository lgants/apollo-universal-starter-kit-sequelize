'use strict';

import Sequelize from 'sequelize';
import models from './';

export default async function(sequelize, DataTypes) {
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
    { timestamps: true }
  );
  Comment.associate = function() {
    // associations can be defined here
  };
  return Comment;
}
