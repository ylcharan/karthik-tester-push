import express from "express";
import { body, validationResult } from "express-validator";
import { promises as fs } from "fs";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ensure folder exists
import { existsSync, mkdirSync } from "fs";
if (!existsSync("data")) mkdirSync("data");

// Read users from JSON file
async function readUsers() {
  try {
    await fs.access("data/user.json");
  } catch {
    // File doesn't exist → create with empty array
    await fs.writeFile("data/user.json", "[]");
  }

  const data = await fs.readFile("data/user.json", "utf-8");
  return JSON.parse(data);
}

// Write users to JSON
async function writeUser(users) {
  await fs.writeFile("data/user.json", JSON.stringify(users, null, 2));
}

function nextId() {}

// Show user table
app.get("/userdetails", async (req, res) => {
  const users = await readUsers();

  if (users.length === 0) {
    return res.send(`<h3>No User found</h3>
    <p><a href="/adduser">Add user</a></p>
    `);
  }

  const rows = users
    .map(
      (u) =>
        `<tr>
          <td>${u.Username}</td>
          <td>${u.Email}</td>
        </tr>`
    )
    .join("");

  res.send(`
    <table border="1" cellpadding="6">
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
      ${rows}
    </table>
  `);
});

// Serve HTML form
app.get("/adduser", (req, res) => {
  res.sendFile("form.html", { root: "public" });
});

// Handle form submit
app.post(
  "/submit",
  [
    body("Username").notEmpty().isLength({ min: 3 }),
    body("Email").notEmpty().isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send(`
        <h2>Validation Error</h2>
        <ul>
          ${errors
            .array()
            .map((e) => `<li>${e.msg}</li>`)
            .join("")}
        </ul>
      `);
    }

    const { Username, Email } = req.body;

    const users = await readUsers();
    users.push({ Username, Email });
    await writeUser(users);

    return res.send(`
      <h2>Data Added</h2>
      <p>Username: ${Username}</p>
      <p>Email: ${Email}</p>
      <p><a href="/userdetails">View all users</a></p>
    `);
  }
);

app.listen(9000, () => console.log("Server running on 9000"));
