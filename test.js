const express = require("express");
const path = require("path");
const fs = require("fs");
const zlib = require("zlib");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/compress", (req, res) => {
  const filename = req.body.filename;
  const inputPath = path.join(__dirname, "files", filename);
  const outputPath = inputPath + ".gz";

  if (fs.existsSync(inputPath)) {
    return res.send(
      `<h3>File "${filename}" already exists. No new file created.</h3>`
    );
  }

  fs.writeFileSync(inputPath, "", "utf8");

  const reader = fs.createReadStream(inputPath);
  const writer = fs.createWriteStream(outputPath);
  const gzip = zlib.createGzip();

  reader.pipe(gzip).pipe(writer);

  writer.on("finish", () => {
    res.send(
      `<h3>New file "${filename}" created and compressed successfully! Saved as "${filename}.gz"</h3>`
    );
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
