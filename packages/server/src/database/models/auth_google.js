'use strict';

import Sequelize from 'sequelize';
import models from './';

export default async function(sequelize, DataTypes) {
  var AuthGoogle = sequelize.define(
    'AuthGoogle',
    {
      google_id: { type: DataTypes.STRING, unique: true },
      display_name: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: models.User,
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }
    },
    { timestamps: true }
  );
  AuthGoogle.associate = function() {
    // associations can be defined here
  };
  return AuthGoogle;
}
