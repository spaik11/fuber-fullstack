const express = require("express");
const router = express.Router();
const {
  checkRefreshTokenMiddleware,
  findUserIfUserExist,
  hasAuthorization,
} = require("./authHelpers/jwtHelper");

const {
  createUser,
  login,
  logout,
  createNewJWTAndRefreshToken,
} = require("./controllers/userController");

router.post("/create-user", createUser);
router.post("/login", login);
router.get("/logout", logout);

router.get(
  "/refresh-token",
  checkRefreshTokenMiddleware,
  findUserIfUserExist,
  hasAuthorization,
  createNewJWTAndRefreshToken
);

module.exports = router;
