// import http from "http";
// import fs from "fs";

// http
//   .createServer((req, res) => {
//     fs.readFile("test.txt", "utf8", (err, data) => {
//       if (err) return res.end("Error reading file");

//       fs.writeFile("duplicate.txt", data, () => {
//         res.end("file duplicated successfully");
//       });
//     });
//   })
//   .listen(8080);
