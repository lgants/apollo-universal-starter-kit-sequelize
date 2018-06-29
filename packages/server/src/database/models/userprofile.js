'use strict';

import Sequelize from 'sequelize';
import models from './';

export default (sequelize, DataTypes) => {
  var UserProfile = sequelize.define(
    'UserProfile',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: models.User,
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }
    },
    {}
  );
  UserProfile.associate = function() {
    // associations can be defined here
  };
  return UserProfile;
};
