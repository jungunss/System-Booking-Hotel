"use strict";
const { Model } = require("sequelize");
const ULID = require("ulid");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsTo(models.Hotel, { foreignKey: "hotel_id" });
    }
  }
  Room.init(
    {
      room_id: {
        type: DataTypes.STRING,
        unique: { msg: "room_id already exists" },
        defaultValue: () => ULID(),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "room_name is required" },
          notEmpty: { msg: "room_name is required" },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "room_type is required" },
          notEmpty: { msg: "room_type is required" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "room_price is required" },
          notEmpty: { msg: "room_price is required" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "room_description is required" },
          notEmpty: { msg: "room_description is required" },
        },
      },
      imgURL: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "room_imgURL is required" },
          notEmpty: { msg: "room_imgURL is required" },
        },
      },
      availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
