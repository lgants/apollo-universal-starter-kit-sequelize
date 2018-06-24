'use strict';

module.exports = (sequelize, DataTypes) => {
  var UserProfile = sequelize.define(
    'UserProfile',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      user_id: DataTypes.INTEGERf
    },
    {}
  );
  UserProfile.associate = function() {
    // associations can be defined here
  };
  return UserProfile;
};
