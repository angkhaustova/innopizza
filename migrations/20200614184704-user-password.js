"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Users", "hashedPassword", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Users", "hashedPassword", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
