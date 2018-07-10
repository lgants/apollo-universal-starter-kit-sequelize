'use strict';

export default function(sequelize, DataTypes) {
  var AuthGithub = sequelize.define(
    'AuthGithub',
    {
      gh_id: { type: DataTypes.STRING, unique: true },
      display_name: DataTypes.STRING
    },
    { timestamps: true, freezeTableName: true, underscored: true }
  );
  AuthGithub.associate = function(models) {
    models.AuthGithub.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return AuthGithub;
}
