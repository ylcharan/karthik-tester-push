function logging(res, req, next) {
  console.log("Logging...");
  next();
}

export default logging;
