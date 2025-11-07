import http from "http";

http.createServer((req, res) => {
  res.statusCode = 200;
  res.statusMessage = "Request Completed.";
  res.writeHead(res.statusCode, res.statusMessage, {
    "Content-Type": "text/html",
  });
  res.write("<h2>Hello</h2>");
  res.write("StatusCode is:", res.statusCode);
});
