const mongoose = require("mongoose");
const moment = require("moment");
const now = moment();

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: "Email is required",
    unique: "Email already exists",
    match: [/.+\@..+/, "Please fill valid email address"],
  },
  password: {
    type: String,
    required: "Password is required",
  },
  userCreated: {
    type: String,
    default: now.format("dddd, MMMM Do YYYY, h:mm:ss a"),
  },
});

module.exports = mongoose.model("User", UserSchema);
