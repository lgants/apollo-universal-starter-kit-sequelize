'use strict';

export default async function(sequelize, DataTypes) {
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
  User.associate = function() {
    // associations can be defined here
  };
  return User;
}
