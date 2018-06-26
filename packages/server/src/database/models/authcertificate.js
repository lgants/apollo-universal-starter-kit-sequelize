'use strict';

import Sequelize from 'sequelize';
import models from './';

module.exports = (sequelize, DataTypes) => {
  var AuthCertificate = sequelize.define(
    'AuthCertificate',
    {
      serial: { type: DataTypes.STRING, unique: true },
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
  AuthCertificate.associate = function() {
    // associations can be defined here
  };
  return AuthCertificate;
};
