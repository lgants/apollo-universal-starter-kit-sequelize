'use strict';

export default function(sequelize, DataTypes) {
  var AuthFacebook = sequelize.define(
    'AuthFacebook',
    {
      fb_id: { type: DataTypes.STRING, unique: true },
      display_name: DataTypes.STRING
    },
    { timestamps: true, freezeTableName: true, underscored: true }
  );
  AuthFacebook.associate = function(models) {
    models.AuthFacebook.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return AuthFacebook;
}
