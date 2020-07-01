const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const config = require("./jwtConfig");
const User = require("../model/User");

const passwordValidator = async (dbPw, userPw) => {
  try {
    const passwordValid = await bcrypt.compare(dbPw, userPw);

    return passwordValid;
  } catch (error) {
    return error;
  }
};

const jwtTokenIssue = (user) => {
  let payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  let jwtToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  let jwtRefreshToken = jwt.sign(
    { id: user.id },
    process.env.ACCESS_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { jwtToken, jwtRefreshToken };
};

const checkAuthMiddleware = expressJwt({
  secret: process.env.ACCESS_TOKEN_SECRET || config["ACCESS_TOKEN_SECRET"],
  userProperty: "auth",
  algorithms: ['RS256']
});

const checkRefreshTokenMiddleware = expressJwt({
  secret:
    process.env.ACCESS_REFRESH_TOKEN_SECRET ||
    config["ACCESS_REFRESH_TOKEN_SECRET"],
  userProperty: "auth",
  algorithms: ['RS256']
});

const findUserIfUserExist = async (req, res, next) => {
  const { id } = req.auth;

  try {
    const foundUser = await User.findById({ _id: id }).select("-__v -password");
    req.profile = foundUser;
    next();
  } catch (e) {
    return res.status(404).json({
      error: "User does not exist",
    });
  }
};

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth.id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  } else {
    next();
  }
};

module.exports = {
  passwordValidator,
  jwtTokenIssue,
  checkAuthMiddleware,
  checkRefreshTokenMiddleware,
  findUserIfUserExist,
  hasAuthorization,
};
