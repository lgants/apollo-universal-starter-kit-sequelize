'use strict';

import Sequelize from 'sequelize';
import models from './';

export default async function(sequelize, DataTypes) {
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
    { timestamps: true, freezeTableName: true }
  );
  // AuthCertificate.associate = function(models) {
  // models.Task.belongsTo(models.User, {
  //   onDelete: "CASCADE",
  //   foreignKey: {
  //     allowNull: false
  //   }
  // });
  AuthCertificate.associate = function() {
    // associations can be defined here
  };
  return AuthCertificate;
}
