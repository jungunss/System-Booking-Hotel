const { User } = require("../models/index");

class authController {
  // EndPoint : POST(register) ============================== >>>
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
      console.log(error);
      next(error);
    }
  }
}

module.exports = authController;
