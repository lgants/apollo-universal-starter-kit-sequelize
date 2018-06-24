'use strict';
module.exports = (sequelize, DataTypes) => {
  var AuthFacebook = sequelize.define(
    'AuthFacebook',
    {
      google_id: DataTypes.STRING,
      display_name: DataTypes.STRING,
      user_id: DataTypes.INTEGER
    },
    {}
  );
  AuthFacebook.associate = function() {
    // associations can be defined here
  };
  return AuthFacebook;
};
