'use strict';

export default function(sequelize, DataTypes) {
  var AuthGoogle = sequelize.define(
    'AuthGoogle',
    {
      google_id: { type: DataTypes.STRING, unique: true },
      display_name: DataTypes.STRING
    },
    { timestamps: true, freezeTableName: true }
  );
  AuthGoogle.associate = function(models) {
    models.AuthGoogle.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return AuthGoogle;
}
