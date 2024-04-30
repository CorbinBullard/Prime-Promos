"use strict";

const { type } = require("os");

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Items",
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
        projectId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Projects",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        itemNumber: {
          type: Sequelize.STRING,
        },
        spcNumber: {
          type: Sequelize.STRING,
        },
        quantity: {
          type: Sequelize.INTEGER,
        },
        sellUnitPrice: {
          type: Sequelize.DECIMAL,
        },
        itemColor: {
          type: Sequelize.STRING,
        },
        logo: {
          type: Sequelize.STRING,
        },
        logoColor: {
          type: Sequelize.STRING,
        },
        stockCheck: {
          type: Sequelize.STRING,
        },
        unitPriceCode: {
          type: Sequelize.ENUM("A/P", "B/Q", "C/R", "D/S", "E/T", "F/U", "G/V"),
          defaultValue: "C/R",
        },
        setupPriceCode: {
          type: Sequelize.ENUM("A/P", "B/Q", "C/R", "D/S", "E/T", "F/U", "G/V"),
          defaultValue: "G/V",
        },
        netUnitPrice: {
          type: Sequelize.DECIMAL,
        },
        sellSetup: {
          type: Sequelize.DECIMAL,
        },
        netSetup: {
          type: Sequelize.DECIMAL,
        },
        proofCharge: {
          type: Sequelize.DECIMAL,
        },
        pmsCharge: {
          type: Sequelize.DECIMAL,
        },
        decorationMethod: {
          type: Sequelize.STRING,
        },
        numberOfImprintColors: {
          type: Sequelize.INTEGER,
        },
        productionTime: {
          type: Sequelize.STRING,
        },
        shippingEstimate: {
          type: Sequelize.DECIMAL,
        },
        factory: {
          type: Sequelize.STRING,
        },
        primePO: {
          type: Sequelize.STRING,
        },
        orderSent: {
          type: Sequelize.DATE,
        },
        preVirtual: {
          type: Sequelize.STRING,
        },
        shipDate: {
          type: Sequelize.DATE,
        },
        tracking: {
          type: Sequelize.STRING,
        },
        delivered: {
          type: Sequelize.DATE,
        },
        receivedOrder: {
          type: Sequelize.DATE,
        },
        proofApprovalFileUrl: {
          type: Sequelize.STRING,
        },
        proofApprovalDate: {
          type: Sequelize.DATE,
        },
        invoice: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.ENUM(
            "quote",
            "order",
            "production",
            "shipped",
            "delivered"
          ),
          defaultValue: "quote",
        },
        prepaymentConfirmed: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
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
    await queryInterface.dropTable("Items");
  },
};
