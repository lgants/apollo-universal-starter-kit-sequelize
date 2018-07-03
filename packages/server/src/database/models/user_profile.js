'use strict';

export default function(sequelize, DataTypes) {
  console.log('aaaaaa', sequelize.models.User);
  var UserProfile = sequelize.define(
    'UserProfile',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: sequelize.models.User,
          key: 'id'
          // deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }
    },
    { timestamps: true, underscored: true, freezeTableName: true }
  );
  UserProfile.associate = function() {
    // associations can be defined here
  };
  return UserProfile;
}
