'use strict';

export default function(sequelize, DataTypes) {
  var Upload = sequelize.define(
    'Upload',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.INTEGER, allowNull: false },
      path: { type: DataTypes.STRING, allowNull: false }
    },
    { timestamps: true, freezeTableName: true, underscored: true }
  );
  Upload.associate = function() {
    // associations can be defined here
  };
  return Upload;
}
