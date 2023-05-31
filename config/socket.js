const socket = io => {
  io.on("connection", socket => {
    console.log(`connection established by: ${socket.id}`);

    socket.emit("me", socket.id);
  });
};

module.exports = socket;
