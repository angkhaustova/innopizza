"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderPizzas = sequelize.define(
    "OrderPizzas",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      orderId: DataTypes.INTEGER,
      pizzaId: DataTypes.INTEGER,
      quantity: { type: DataTypes.INTEGER, default: 1 },
    },
    {}
  );
  OrderPizzas.associate = function (models) {
    // associations can be defined here
    OrderPizzas.belongsTo(models.Order);
  };
  return OrderPizzas;
};
