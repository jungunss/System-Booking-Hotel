"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.hasMany(models.Room, { foreignKey: "hotel_id" });
    }
  }
  Hotel.init(
    {
      hotel_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "hotel_id already exists" },
        validate: {
          notNull: { msg: "hotel_id is required" },
          notEmpty: { msg: "hotel_id is required" },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "hotel_name already exists" },
        validate: {
          notNull: { msg: "hotel_name is required" },
          notEmpty: { msg: "hotel_name is required" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "hotel_address is required" },
          notEmpty: { msg: "hotel_address is required" },
        },
      },
      star: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "hotel_star is required" },
          notEmpty: { msg: "hotel_star is required" },
        },
      },
      imgURL: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "hotel_imgURL is required" },
          notEmpty: { msg: "hotel_imgURL is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Hotel",
    }
  );
  return Hotel;
};
