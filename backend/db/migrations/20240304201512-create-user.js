"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Users",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        firstName: {
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
        },
        hashedPassword: {
          type: Sequelize.STRING,
        },
        role: {
          type: Sequelize.ENUM,
          values: ["owner", "admin", "user"],
          allowNull: false,
          defaultValue: "user",
        },
        validated: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        invitationToken: {
          type: Sequelize.STRING,
        },
        tokenExpiration: {
          type: Sequelize.DATE,
        },
        profileImageUrl: {
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
    options.tableName = "Users";
    await queryInterface.dropTable(options);
  },
};
