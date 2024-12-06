"use strict";

const { Model } = require("sequelize");
const ULID = require("ulid");

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Room, { foreignKey: "room_id" });
      Booking.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }

  Booking.init(
    {
      order_id: {
        type: DataTypes.STRING,
        unique: { msg: "order_id already exists" },
        defaultValue: () => ULID.ulid(),
        primaryKey: true,
      },
      room_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "room_id is required" },
          notEmpty: { msg: "room_id is required" },
        },
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "user_id is required" },
          notEmpty: { msg: "user_id is required" },
        },
      },
      check_in_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "check_in_date is required" },
          notEmpty: { msg: "check_in_date is required" },
          isDate: { msg: "invalid date format" },
        },
      },
      check_out_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "check_out_date is required" },
          notEmpty: { msg: "check_out_date is required" },
          isDate: { msg: "invalid date format" },
          checkDates(value) {
            if (new Date(value) <= new Date(this.check_in_date)) {
              throw new Error(
                "check_out_date must be later than check_in_date"
              );
            }
          },
        },
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "total_price is required" },
          notEmpty: { msg: "total_price is required" },
          isInt: { msg: "invalid total_price format" },
          min: {
            args: 50000,
            msg: "minimum price is Rp.50,000",
          },
        },
      },
      booking_status: {
        type: DataTypes.ENUM("booked", "cancelled", "completed"),
        allowNull: false,
        defaultValue: "booked",
        validate: {
          notNull: { msg: "booking_status is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Booking",
      timestamps: true,
    }
  );

  return Booking;
};
