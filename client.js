import net from "net";

const client = net.createConnection({ port: 5050 }, () => {
  console.log("Connected to server");
  client.write("Hello Server");
});

client.on("data", (chunk) => {
  console.log("Server says : " + chunk.toString());
  client.end();
});
