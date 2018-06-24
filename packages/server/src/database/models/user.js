'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN
    },
    {}
  );
  User.associate = function() {
    // associations can be defined here
  };
  return User;
};
