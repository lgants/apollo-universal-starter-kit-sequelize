'use strict';
module.exports = (sequelize, DataTypes) => {
  var AuthGoogle = sequelize.define(
    'AuthGoogle',
    {
      fb_id: DataTypes.STRING,
      display_name: DataTypes.STRING,
      user_id: DataTypes.INTEGER
    },
    {}
  );
  AuthGoogle.associate = function() {
    // associations can be defined here
  };
  return AuthGoogle;
};
