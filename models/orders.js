"use strict";
module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "Orders",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      address: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Orders.associate = function (models) {
    // associations can be defined here
    Orders.hasOne(models.User);
  };
  return Orders;
};
