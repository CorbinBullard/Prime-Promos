"use strict";

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
      // {
      //   email: "robin26@cooper.com",
      //   firstName: "James",
      //   lastName: "Torres",
      //   hashedPassword:
      //     "$2b$12$KO5IZwq9Q.vPaKaJQDWyYOWu6vPrzb9IiYsGmZy8AN0ZoYLX4FLmy",
      //   role: "user",
      //   validated: true,
      // },
      // {
      //   email: "mclaughlinmark@wilcox.com",
      //   firstName: "Julia",
      //   lastName: "Hall",
      //   hashedPassword:
      //     "$2b$12$4sWRjSsViGPhkmjldSslkucgjGtuVjzG.JjKvAVwqcmmc63mJTuBW",
      //   role: "admin",
      //   validated: true,
      // },
      // {
      //   email: "tracy33@schultz.com",
      //   firstName: "Jimmy",
      //   lastName: "Boone",
      //   hashedPassword:
      //     "$2b$12$12sT2dx8pOZ3mwnWAIlb7.W4vdSF.FM7zYkWnSihyedyIUQpKaxPS",
      //   role: "user",
      //   validated: true,
      // },
      // {
      //   email: "collinanderson@stanley-flores.com",
      //   firstName: "Julie",
      //   lastName: "Fox",
      //   hashedPassword:
      //     "$2b$12$y4Zlj8wCK8m8mV0tmBPBpelLrJXj7cZCDFGX3BcDjbN9Fys9W1PoO",
      //   role: "user",
      //   validated: true,
      // },
      // {
      //   email: "whitney39@gmail.com",
      //   firstName: "Sean",
      //   lastName: "Todd",
      //   hashedPassword:
      //     "$2b$12$WAHnc3JtAz4e6FJ4qVjOAeUpv2oj4f9vY9q1xpjAe2f7ZCWzQuTcu",
      //   role: "user",
      //   validated: true,
      // },
      // {
      //   email: "antonio22@hotmail.com",
      //   firstName: "Natalie",
      //   lastName: "Powell",
      //   hashedPassword:
      //     "$2b$12$uNQgPc.ZzWbhhBPzroIG6uaz35WpK1RXHSfMZkIlzJLRLoImv.O0.",
      //   role: "user",
      //   validated: true,
      // },
      // {
      //   email: "sonyaramirez@contreras.com",
      //   firstName: "Jesse",
      //   lastName: "Fletcher",
      //   hashedPassword:
      //     "$2b$12$kVIyiZ6NW/i5rDKkHZcsR.eXbnmyXil57TGx.FDIXyxM0qToAoygq",
      //   role: "user",
      //   validated: true,
      // },
      // {
      //   email: "qlarson@gmail.com",
      //   firstName: "James",
      //   lastName: "Garrison",
      //   hashedPassword:
      //     "$2b$12$z2mZ4V/aTxoEuBLTuEweRuenZXfe0UlZVdHeFp2/hIDNM9lk6Qpw.",
      //   role: "admin",
      //   validated: true,
      // },
      // {
      //   email: "ybennett@yahoo.com",
      //   firstName: "Randall",
      //   lastName: "Williamson",
      //   hashedPassword:
      //     "$2b$12$17/5xOtRpUVgpcQ2rhyTreIXvCpGs9nJAuGLVJEb3C63JGpQRheSO",
      //   role: "admin",
      //   validated: true,
      // },
      // {
      //   email: "yanderson@smith.com",
      //   firstName: "Theresa",
      //   lastName: "Vaughn",
      //   hashedPassword:
      //     "$2b$12$obf2r7WCLCEE1IY6PH2c7u8qsFXIxBBM.TVGG2YXPjWYvuGKaY1CG",
      //   role: "admin",
      //   validated: true,
      // },
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
