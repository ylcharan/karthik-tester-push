import net from "net";

const server = net.createServer((socket) => {
  console.log("Client Connected.");

  socket.write("Hello Client");
  socket.on("data", (data) => {
    console.log("Received", data.toString());
  });

  socket.on("end", () => {
    console.log("Client is disconnected.");
  });
});

server.listen(5050, () => {
  console.log("server is running on https://localhost:5050");
});
