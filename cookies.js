import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const demoUser = {
  username: "user",
  password: "1234",
};

app.get("/", (req, res) => {
  res.send(`
    <h2>Welcome to the Cookie Demo</h2>
    <form method="POST" action="/login">
      <label>Username: <input type="text" name="username" /></label><br/>
      <label>Password: <input type="password" name="password" /></label><br/>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const obj = JSON.parse(req.cookies.userCookie);

  if (username === demoUser.username && password === demoUser.password) {
    res.cookie("username", username, { maxAge: 90000, httpOnly: true });
    return res.redirect("/welcome");
  }
  res.redirect("/");
});

app.get("/welcome", (req, res) => {
  const user = req.cookies.username;
  if (!user) return res.redirect("/");
  res.send(`
    <h2>Welcome back, ${user}!</h2>
    <a href="/logout">Logout</a>
  `);
});

app.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
