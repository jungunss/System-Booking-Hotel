const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: "UNAUTHORIZED" };
    const access_token = authorization.split(" ")[1];
    const payload = verifyToken(access_token);
    const loginUser = await User.findOne({
      where: {
        email: payload.email,
      },
    });
    if (!loginUser) throw { name: "UNAUTHORIZED" };
    req.loginData = {
      user_id: loginUser.user_id,
      email: loginUser.email,
    };

    next();
  } catch (error) {
    console.log(error); // <<<<< !!!!!!!!!
    next(error);
  }
};

module.exports = { authentication };
