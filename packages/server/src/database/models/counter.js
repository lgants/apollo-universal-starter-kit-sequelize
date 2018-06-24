'use strict';
module.exports = (sequelize, DataTypes) => {
  var Counter = sequelize.define(
    'Counter',
    {
      amount: DataTypes.INTEGER
    },
    {}
  );
  Counter.associate = function() {
    // associations can be defined here
  };
  return Counter;
};
