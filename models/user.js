"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Booking, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "username already exists" },
        validate: {
          notNull: { msg: "username is required" },
          notEmpty: { msg: "username is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "email already in use" },
        validate: {
          notNull: { msg: "email is required" },
          notEmpty: { msg: "email is required" },
          isEmail: { msg: "invalid email format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password is required" },
          notEmpty: { msg: "password is required" },
          len: {
            args: [5],
            msg: "Password must have 5 characters",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "User",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
