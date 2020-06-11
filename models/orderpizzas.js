"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderPizzas = sequelize.define(
    "OrderPizzas",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      orderId: DataTypes.INTEGER,
      pizzaId: DataTypes.INTEGER,
    },
    {}
  );
  OrderPizzas.associate = function (models) {
    // associations can be defined here
  };
  return OrderPizzas;
};
