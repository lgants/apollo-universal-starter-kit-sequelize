'use strict';

export default function(sequelize, DataTypes) {
  var UserProfile = sequelize.define(
    'UserProfile',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING
    },
    { timestamps: true, freezeTableName: true, underscored: true }
  );
  UserProfile.associate = function() {
    // associations can be defined here
  };
  return UserProfile;
}
