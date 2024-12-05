"use strict";

const { hash } = require("../helpers/bcrypt");
const ULID = require("ulid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require("../db/users.json");
    users.forEach((user) => {
      user.user_id = ULID.ulid();
      user.password = hash(user.password);
      user.createdAt = new Date();
      user.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  },
};
