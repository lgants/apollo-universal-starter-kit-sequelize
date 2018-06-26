'use strict';

import Sequelize from 'sequelize';
import models from './';

module.exports = (sequelize, DataTypes) => {
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
    {}
  );
  AuthGoogle.associate = function() {
    // associations can be defined here
  };
  return AuthGoogle;
};
