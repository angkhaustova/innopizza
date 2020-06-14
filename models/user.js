"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      hashedPassword: {
        type: DataTypes.STRING,
        is: /^[0-9a-f]{64}$/i,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Order);
  };
  return User;
};
