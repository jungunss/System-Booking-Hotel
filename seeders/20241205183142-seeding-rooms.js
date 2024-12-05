"use strict";

const ULID = require("ulid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rooms = require("../db/rooms.json");
    rooms.forEach((room) => {
      room.room_id = ULID.ulid();
      room.createdAt = new Date();
      room.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Rooms", rooms, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Rooms", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
