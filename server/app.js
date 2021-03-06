const createError = require("http-errors");
const express = require("express");
const compression = require("compression");
const socket_io = require("socket.io");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoose = require("mongoose");
// const indexRouter = require("./routes/index")(io);
const usersRouter = require("./routes/users/users");
require("dotenv").config();

const app = express();
const io = socket_io({
  transports: ["websocket"],
  pingTimeout: 120000,
  pingInterval: 5000,
});
app.io = io;

mongoose
  .connect(process.env.MONGODB_URI, {
    // .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection success!"))
  .catch((e) => console.log(e));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  cors({
    origin: ["https://fuber-fullstack.herokuapp.com"],
    // origin: ["http://localhost:3000"],
    credentials: true,
  })
);
// Set security HTTP headers
app.use(helmet());

app.use(xss());

app.use(compression());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/api/users", usersRouter);

const userArray = [];
const chatMessages = [];

io.on("connection", (socket) => {
  io.clients((error, clients) => {
    if (error) throw error;
    console.log("clients", clients);
    io.emit("connected-to-socket", userArray);
    io.emit("get-chat-messages", chatMessages);
  });

  socket.on("initial-connect", (userInfo) => {
    let connectionId = socket.id;
    const emailList = userArray.map((entry) => entry.email);
    if (!emailList.includes(userInfo.email)) {
      userArray.push({ ...userInfo, connectionId });
    }
    io.emit("updated-user-list", userArray);
    console.log("User array", userArray);
  });

  socket.on("user-coordinates", (coords) => {
    let foundUser = userArray.find((user) => user.email === coords.email);
    if (foundUser) {
      userArray.splice(userArray.indexOf(foundUser), 1);
      foundUser.lat = coords.lat;
      foundUser.lng = coords.lng;
      userArray.push(foundUser);
    }
    io.emit("updated-user-list", userArray);
  });

  socket.on("set-request", (request) => {
    let foundUser = userArray.find((user) => user.email === request.email);
    if (foundUser) {
      userArray.splice(userArray.indexOf(foundUser), 1);
      foundUser.requestBody = {
        subject: request.subject,
        description: request.description,
        incentive: request.incentive,
      };
      foundUser.requestHelpSent = true;
      foundUser.requestAccepted = false;
      userArray.push(foundUser);
    }
    io.emit("updated-user-list", userArray);
  });

  socket.on("remove-request", (sentUser) => {
    let foundUser = userArray.find((user) => user.email === sentUser.email);
    if (foundUser) {
      userArray.splice(userArray.indexOf(foundUser), 1);
      foundUser.requestBody = {
        subject: null,
        description: null,
        incentive: null,
      };
      foundUser.requestHelpSent = false;
      foundUser.requestAccepted = null;
      userArray.push(foundUser);
    }
    io.emit("updated-user-list", userArray);
  });

  socket.on("accept-request", (friendEmail) => {
    let foundUser = userArray.find((user) => user.email === friendEmail.email);
    if (foundUser) {
      userArray.splice(userArray.indexOf(foundUser), 1);
      foundUser.requestAccepted = true;
      foundUser.acceptedBy = friendEmail.acceptedBy;
      userArray.push(foundUser);
    }
    io.emit("updated-user-list", userArray);
  });

  socket.on("get-duration", (sentUser) => {
    let foundUser = userArray.find((user) => user.email === sentUser.email);
    if (foundUser) {
      userArray.splice(userArray.indexOf(foundUser), 1);
      foundUser.duration = sentUser.duration;
      userArray.push(foundUser);
    }
    io.emit("updated-user-list", userArray);
  });

  socket.on("cancel-help", (friendEmail) => {
    let foundUser = userArray.find((user) => user.email === friendEmail.email);
    if (foundUser) {
      userArray.splice(userArray.indexOf(foundUser), 1);
      foundUser.requestAccepted = false;
      foundUser.acceptedBy = null;
      userArray.push(foundUser);
    }
    io.emit("request-canceled");
    io.emit("updated-user-list", userArray);
  });

  socket.on("receive-message", (message) => {
    if (chatMessages.length > 50) chatMessages.shift();
    chatMessages.push(message);
    io.emit("get-chat-messages", chatMessages);
  });

  console.log(`A socket connection to the server has been made: ${socket.id}`);

  socket.on("disconnect", () => {
    let disconnectUser = userArray.find(
      (user) => user.connectionId === socket.id
    );
    console.log("Disconnected user", disconnectUser);
    if (disconnectUser !== undefined) {
      userArray.splice(userArray.indexOf(disconnectUser), 1);
    }
    io.emit("updated-user-list", userArray);
    console.log("DISCONNECT USER ARR", userArray);
    console.log(`Connection ${socket.id} has left the building`);
  });

  socket.on("reconnect_attempt", () => {
    console.log("reconnect_attempt");
    socket.io.opts.transports = ["polling", "websocket"];
  });

  socket.on("error", () => {
    console.log(error);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
