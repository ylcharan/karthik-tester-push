import express from "express";
import { WebSocketServer } from "ws";

const app = express();

const server = app.listen(8080, () => {
  console.log("server is listening to port 8080");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log("client sent the message: " + data);
    ws.send("thanks buddy ");
  });
});
