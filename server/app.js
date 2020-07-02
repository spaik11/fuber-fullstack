const createError = require("http-errors");
const express = require("express");
const compression = require("compression");
const app = express();
const socket_io = require("socket.io");
const io = socket_io();
app.io = io;
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

mongoose
  .connect(process.env.MONGO_DB, {
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
    origin: ["http://localhost:3000"],
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

let userArray = [];
console.log(userArray)

io.on("connection", (socket) => {
  io.clients((error, clients) => {
    if (error) throw error;
    console.log("clients", clients);
    console.log(userArray)
    io.emit('connected-to-socket', userArray)
  });


  console.log(`A socket connection to the server has been made: ${socket.id}`);

  socket.on("position", (position) => {
    console.log("position", position);
    let connectionId = socket.id;
    userArray.push({ ...position, connectionId });
    io.emit('connected-to-socket', userArray)
    // socket.broadcast.emit("otherPositions", userArray);
    console.log("USER ARR", userArray);
  });

  socket.on("disconnect", () => {
    let disconnectUser = userArray.find(
      (user) => user.connectionId === socket.id
    );
    console.log('Disconnected user', disconnectUser)
    userArray.splice(userArray.indexOf(disconnectUser), 1);
    io.emit('connected-to-socket', userArray)
    console.log("DISCONNECT USER ARR", userArray);
    console.log(`Connection ${socket.id} has left the building`);
  });
});

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
