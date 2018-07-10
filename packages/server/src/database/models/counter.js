'use strict';

export default function(sequelize, DataTypes) {
  var Counter = sequelize.define(
    'Counter',
    {
      amount: DataTypes.INTEGER
    },
    { timestamps: true, freezeTableName: true, underscored: true }
  );
  Counter.associate = function() {
    // associations can be defined here
  };
  return Counter;
}
