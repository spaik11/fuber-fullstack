const bcrypt = require("bcryptjs");
const User = require("../model/User");
const dbErrorHelper = require("../authHelpers/dbErrorHelper");
const {
  passwordValidator,
  jwtTokenIssue,
} = require("../authHelpers/jwtHelper");
require("dotenv").config();

module.exports = {
  createUser: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      let createdUser = new User({
        username,
        email,
        password,
      });

      let genSalt = await bcrypt.genSalt(12);
      let hashedPassword = await bcrypt.hash(createdUser.password, genSalt);
      createdUser.password = hashedPassword;

      await createdUser.save();

      let { jwtToken } = jwtTokenIssue(createdUser);

      res.cookie("jwt-cookie-expense", jwtToken, {
        expires: new Date(Date.now() + 36000 * 60),
        httpOnly: false,
        secure: process.env.NODE_ENV === "production" ? true : false,
      });

      createdUser = createdUser.toObject();
      delete createdUser.password;

      res.json({
        message: "User Created",
        user: createdUser,
      });
    } catch (e) {
      res.status(500).json({
        message: dbErrorHelper(e),
      });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      let foundUser = await User.findOne({ email }).select("-__v -userCreated");

      if (!foundUser) {
        throw Error("User not found, please sign up");
      } else {
        const verifyPw = await passwordValidator(password, foundUser.password);

        if (!verifyPw) {
          throw Error("Password incorrect");
        } else {
          let { jwtToken, jwtRefreshToken } = jwtTokenIssue(foundUser);

          res.cookie("jwt-cookie-expense", jwtToken, {
            expires: new Date(Date.now() + 36000 * 60),
            httpOnly: false,
            secure: process.env.NODE_ENV === "production" ? true : false,
          });

          res.cookie("jwt-refresh-cookie-expense", jwtRefreshToken, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: false,
            secure: process.env.NODE_ENV === "production" ? true : false,
          });

          foundUser = foundUser.toObject();
          delete foundUser.password;

          res.json({
            message: "Success",
            user: foundUser,
          });
        }
      }
    } catch (e) {
      res.status(500).json({
        message: dbErrorHelper(e),
      });
    }
  },
  logout: (req, res) => {
    res.clearCookie("jwt-cookie-expense");
    res.clearCookie("jwt-refresh-cookie-expense");
    res.end();
  },
  createNewJWTAndRefreshToken: (req, res) => {
    try {
      let { jwtToken, jwtRefreshToken } = jwtTokenIssue(req.profile);

      res.cookie("jwt-cookie-expense", jwtToken, {
        expires: new Date(Date.now() + 36000 * 60),
        httpOnly: false,
        secure: process.env.NODE_ENV === "production" ? true : false,
      });

      res.cookie("jwt-refresh-cookie-expense", jwtRefreshToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: false,
        secure: process.env.NODE_ENV === "production" ? true : false,
      });

      res.status(200).json({
        status: 200,
        message: "Successfully renewed token and refresh token",
      });
    } catch (e) {
      res.status(400).json({
        message: dbErrorHelper(e),
      });
    }
  },
};
