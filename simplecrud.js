const express = require("express");
const app = express();

app.use(express.json()); // for JSON body parsing

let users = []; // temporary in-memory “database”

// -------------------------------------
// CREATE (POST)
// -------------------------------------
app.post("/users", (req, res) => {
  const user = req.body;
  users.push(user);

  res.status(201).json({
    message: "User created",
    user,
  });
});

// -------------------------------------
// READ ALL (GET)
// -------------------------------------
app.get("/users", (req, res) => {
  res.json(users);
});

// -------------------------------------
// READ ONE (GET)
// -------------------------------------
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!users[id]) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(users[id]);
});

// -------------------------------------
// UPDATE (PUT)
// -------------------------------------
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!users[id]) {
    return res.status(404).json({ error: "User not found" });
  }

  users[id] = { ...users[id], ...req.body };

  res.json({
    message: "User updated",
    user: users[id],
  });
});

// -------------------------------------
// DELETE (DELETE)
// -------------------------------------
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!users[id]) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(id, 1);

  res.json({ message: "User deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
