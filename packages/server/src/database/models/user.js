'use strict';

export default function(sequelize, DataTypes) {
  var User = sequelize.define(
    'User',
    {
      username: { type: DataTypes.STRING, unique: true },
      email: { type: DataTypes.STRING, unique: true },
      password_hash: { type: DataTypes.STRING },
      role: { type: DataTypes.STRING, defaultValue: 'user' },
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
    },
    { timestamps: true, freezeTableName: true }
  );
  User.associate = function(models) {
    models.User.hasOne(models.UserProfile, {
      foreignKey: 'user_id'
    });
  };
  return User;
}
