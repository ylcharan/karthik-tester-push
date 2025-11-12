import express from "express";
// import fs from "fs";

const server = express();

server.get("/", (req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.send("<h2>Hello world</h2>");
  // res.end("hello");
});

server.get("/home", (req, res) => {
  //   res.send("Welcome user");
  res.redirect("/user");
});

server.get("/user", (req, res) => {
  res.send("Welcome to the user page");
});

server.get("/:page", (req, res) => {
  res.send(req.params.page + " page was not found (404).");
});

server.listen(3000, () => {
  console.log("Port is running on 3000");
});
