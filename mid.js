import express from "express";

const app = express();

function ageCheck(req, res, next) {
  const age = Number(req.query.age);
  //   const country = String(req.query.country);

  if (age < 18) {
    res.send("You are not allowed to visit");
  }

  //   if (country.toLowerCase() != "india") {
  //     res.send("Invalid region");
  //   }
  next();
}

function countryCheck(req, res, next) {
  const country = String(req.query.country);

  if (country.toLowerCase() != "india") {
    res.send("Invalid region");
  }
  next();
}

app.get("/user", ageCheck, (req, res) => {
  res.send("Welcome");
});

app.get("/about", [ageCheck, countryCheck], (req, res) => {
  res.send("Welcome to about page");
});

app.get("/user/:id", (req, res) => {
  res.send("Welcome " + req.params.id);
});

app.listen(4000);
