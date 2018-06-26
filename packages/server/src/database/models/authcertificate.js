'use strict';
module.exports = (sequelize, DataTypes) => {
  var AuthCertificate = sequelize.define(
    'AuthCertificate',
    {
      string: DataTypes.STRING,
      user_id: DataTypes.INTEGER
    },
    {}
  );
  AuthCertificate.associate = function() {
    // associations can be defined here
  };
  return AuthCertificate;
};
