"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pizza = sequelize.define(
    "Pizza",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      code: DataTypes.STRING,
      price: DataTypes.FLOAT,
    },
    {}
  );
  Pizza.associate = function (models) {
    // associations can be defined here
  };
  return Pizza;
};
