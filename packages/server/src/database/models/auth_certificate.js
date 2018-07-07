'use strict';

export default function(sequelize, DataTypes) {
  var AuthCertificate = sequelize.define(
    'AuthCertificate',
    {
      serial: { type: DataTypes.STRING, unique: true }
    },
    { timestamps: true, freezeTableName: true }
  );
  // AuthCertificate.associate = function(models) {
  // models.Task.belongsTo(models.User, {
  //   onDelete: "CASCADE",
  //   foreignKey: {
  //     allowNull: false
  //   }
  // });
  AuthCertificate.associate = function(models) {
    models.AuthCertificate.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return AuthCertificate;
}
