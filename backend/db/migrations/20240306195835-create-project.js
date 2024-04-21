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
        collegeName: {
          type: Sequelize.STRING,
        },
        contactName: {
          type: Sequelize.STRING,
        },
        inHandsDate: {
          type: Sequelize.DATE,
        },
        eventDate: {
          type: Sequelize.DATE,
        },
        customerPO: {
          type: Sequelize.INTEGER,
        },
        salesConfirmation: {
          type: Sequelize.INTEGER,
        },
        status: {
          type: Sequelize.ENUM("active", "completed"),
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
