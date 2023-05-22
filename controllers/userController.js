const { User } = require("../models/");
const { hashPassword, comparePassword } = require("../helpers/brcypt");
const { signToken } = require("../helpers/jwt");
class UserController {
  static async postRegister(req, res, next) {
    try {
      const { username, email, password } = req.body;
      if (!username) {
        throw {
          name: "Username is required",
        };
      }
      if (!email) {
        throw {
          name: "Email is required",
        };
      }
      if (!password) {
        throw {
          name: "Password is required",
        };
      }
      const user = await User.create({
        username,
        email,
        password: hashPassword(password),
      });
      console.log(user);
      res.status(201).json({
        id: user.id,
        username,
        email,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async postLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw {
          name: "Email is required",
        };
      }
      if (!password) {
        throw {
          name: "Password is required",
        };
      }
      const findUser = await User.findOne({
        where: {
          email,
        },
      });
      if (!findUser) {
        throw {
          name: "Invalid email/password",
        };
      }
      const verifyPass = comparePassword(password, findUser.password);
      if (!verifyPass) {
        throw {
          name: "Invalid email/password",
        };
      }
      const payload = {
        id: findUser.id,
        username: findUser.username,
        email,
      };
      const token = signToken(payload);
      res.status(200).json({
        access_token: token,
      });

      // console.log(findUser);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
