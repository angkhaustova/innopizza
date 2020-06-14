"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      address: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Order.associate = function (models) {
    // associations can be defined here
    Order.belongsTo(models.User);
    Order.hasMany(models.OrderPizzas);
  };
  return Order;
};
