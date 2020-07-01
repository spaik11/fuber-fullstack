module.exports = function (io) {
  const app = require("express");
  const router = app.Router();

  io.on("connection", function (socket) {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    socket.on("disconnect", () => {
      console.log(`Connection ${socket} has left the building`);
    });
  });

  return router;
};
