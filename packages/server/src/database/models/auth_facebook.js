'use strict';

export default function(sequelize, DataTypes) {
  var AuthFacebook = sequelize.define(
    'AuthFacebook',
    {
      fb_id: { type: DataTypes.STRING, unique: true },
      display_name: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: sequelize.models.User,
          key: 'id'
          // deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }
    },
    { timestamps: true, freezeTableName: true }
  );
  AuthFacebook.associate = function() {
    // associations can be defined here
  };
  return AuthFacebook;
}
