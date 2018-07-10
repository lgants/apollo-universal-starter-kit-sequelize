'use strict';

export default function(sequelize, DataTypes) {
  var AuthLinkedin = sequelize.define(
    'AuthLinkedin',
    {
      ln_id: { type: DataTypes.STRING, unique: true },
      display_name: DataTypes.STRING
    },
    { timestamps: true, freezeTableName: true, underscored: true }
  );
  AuthLinkedin.associate = function(models) {
    models.AuthLinkedin.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return AuthLinkedin;
}
