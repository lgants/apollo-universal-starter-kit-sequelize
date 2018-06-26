'use strict';
module.exports = (sequelize, DataTypes) => {
  var Counter = sequelize.define(
    'Counter',
    {
      amount: { type: DataTypes.INTEGER, allowNull: false }
    },
    {}
  );
  Counter.associate = function() {
    // associations can be defined here
  };
  return Counter;
};
