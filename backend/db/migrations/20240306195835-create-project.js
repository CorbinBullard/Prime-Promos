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
        organizationName: {
          type: Sequelize.STRING,
        },
        contactName: {
          type: Sequelize.STRING,
        },
        contactEmail: {
          type: Sequelize.STRING,
        },
        contactPhone: {
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
        billToName: {
          type: Sequelize.STRING,
        },
        billToAddress: {
          type: Sequelize.STRING,
        },
        billToCity: {
          type: Sequelize.STRING,
        },
        billToState: {
          type: Sequelize.STRING,
        },
        billToZip: {
          type: Sequelize.STRING,
        },
        shipToName: {
          type: Sequelize.STRING,
        },
        shipToAddress: {
          type: Sequelize.STRING,
        },
        shipToCity: {
          type: Sequelize.STRING,
        },
        shipToState: {
          type: Sequelize.STRING,
        },
        shipToZip: {
          type: Sequelize.STRING,
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
