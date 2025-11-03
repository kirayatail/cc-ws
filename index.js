const express = require("express");
const wsServer = require("./websocket.js")();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static("cc-ws-front/build"));

const server = app.listen(PORT, () => {
  console.log("Express server running on " + PORT);
});

server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request);
  });
});
