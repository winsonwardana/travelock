const { User } = require("../models/");
const { hashPassword } = require("../helpers/brcypt");

class UserController {
  static async postRegister(req, res) {
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
      if (err.name === "Username is required") {
        res.status(400).json({
          message: "Username is required",
        });
      } else if (err.name === "Email is required") {
        res.status(400).json({
          message: "Email is required",
        });
      } else if (err.name === "Password is required") {
        res.status(400).json({
          message: "Password is required",
        });
      } else if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError"
      ) {
        res.status(400).json({
          message: `${err.errors[0].message}`,
        });
      } else {
        res.status(500).json({
          message: "Internal server error",
        });
      }
    }
  }
}

module.exports = UserController;
