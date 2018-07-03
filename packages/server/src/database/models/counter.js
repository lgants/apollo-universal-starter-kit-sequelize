'use strict';

export default function(sequelize, DataTypes) {
  var Counter = sequelize.define(
    'Counter',
    {
      amount: DataTypes.INTEGER
    },
    { timestamps: true, underscored: true, freezeTableName: true }
  );
  Counter.associate = function() {
    // associations can be defined here
  };
  // Todo.associate = (models) => {
  //   Todo.hasMany(models.TodoItem, {
  //     foreignKey: 'todoId',
  //     as: 'todoItems',
  //   });
  // };
  return Counter;
}
