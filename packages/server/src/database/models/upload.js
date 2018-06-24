'use strict';
module.exports = (sequelize, DataTypes) => {
  var Upload = sequelize.define(
    'Upload',
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      size: DataTypes.INTEGER,
      path: DataTypes.STRING
    },
    {}
  );
  Upload.associate = function() {
    // associations can be defined here
  };
  return Upload;
};
