"use strict";
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Projects",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        inHandsDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        eventDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        customerPO: {
          type: Sequelize.INTEGER,
        },
        salesConfirmation: {
          type: Sequelize.INTEGER,
        },
        status: {
          type: Sequelize.ENUM("active", "completed", "archived"),
          defaultValue: "active",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Projects";
    await queryInterface.dropTable(options);
  },
};
