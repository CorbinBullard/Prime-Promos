"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "Users";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(options, [
      {
        email: "orders@prime-promos.com",
        firstName: "Vanessa",
        lastName: "Mora",
        hashedPassword: bcrypt.hashSync(""),
        role: "owner",
        validated: true,
        createdAt: new Date(),  // Add these fields
        updatedAt: new Date()   // Add these fields
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
