import http from "http";
import fs from "fs";

http
  .createServer((req, res) => {
    if (req.url == "/") {
      fs.readFile("./form.html", "utf-8", (err, data) => {
        if (err) {
          res.end("File not found");
        } else {
          res.writeHead(200, { "content-type": "text/html" });
          res.write(data);
          res.end();
        }
      });
    } else if (req.url == "/submit") {
      let rdata = [];

      req.on("data", (chunk) => rdata.push(chunk));

      req.on("end", () => {
        let readData = Buffer.concat(rdata).toString();
        let finalData = readData.split("&").reduce((acc, data) => {
          const sData = data.split("=");
          acc[sData[0]] = sData[1];
          return acc;
        }, {});
        console.log(finalData);
        const writedata =
          "Entered name is: " +
          finalData.Username +
          " Entered email is: " +
          finalData.Email;
        console.log(writedata);
      });

      res.end("Data added successfully");
    } else {
      res.end(req.url);
    }
  })
  .listen(5050);
