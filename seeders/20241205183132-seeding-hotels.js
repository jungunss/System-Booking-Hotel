"use strict";

const ULID = require("ulid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hotels = require("../db/hotels.json");
    hotels.forEach((hotel) => {
      hotel.hotel_id = hotel.hotel_id || ULID.ulid();
      hotel.createdAt = new Date();
      hotel.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Hotels", hotels, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Hotels", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
