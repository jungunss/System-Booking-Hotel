const { compare } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");

class authController {
  // EndPoint : POST(Register) ============================== >>>
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      if (!password) throw { name: "EMPTY_PASSWORD" };
      const signUp = await User.create({
        username,
        email,
        password,
      });
      const newUser = await User.findOne({
        where: {
          user_id: signUp.user_id,
        },
        attributes: {
          exclude: ["password"],
        },
      });
      if (!newUser) throw { name: "NOT_FOUND" };
      res.status(201).json({ message: "register successfully", newUser });
    } catch (error) {
      next(error);
    }
  }

  // EndPoint : POST(Login) ============================== >>>
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "EMPTY_EMAIL" };
      if (!password) throw { name: "EMPTY_PASSWORD" };
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user || !compare(password, user.password))
        throw { name: "INVALID_LOGIN" };
      const payload = {
        user_id: user.user_id,
        email: user.email,
        username: user.username,
      };
      const access_token = signToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = authController;
