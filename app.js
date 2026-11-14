
const path = require("path");
const express = require("express");
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET;

let db;

// Database initialization
const initializeDB = async () => {
  db = await sqlite.open({
    filename: "./userDatabase.db",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS "user" (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      name TEXT,
      password TEXT
    );
  `);

  console.log("==================================");
  console.log("Database connected successfully");
  console.log("==================================");
};

// Register API
app.post("/register/", async (request, response) => {
  try {
    const { username, name, password } = request.body;

    if (!username || !name || !password) {
      console.log("REGISTER FAILED: All fields are required");

      return response.status(400).send({
        error: "All fields are required"
      });
    }

    const existingUser = await db.get(
      'SELECT * FROM "user" WHERE username = ?',
      [username]
    );

    if (existingUser) {
      console.log("REGISTER FAILED: Username already exists");
      console.log("Username:", username);

      return response.status(400).send({
        error: "Username already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run(
      'INSERT INTO "user" (username, name, password) VALUES (?, ?, ?)',
      [username, name, hashedPassword]
    );

    console.log("\n========== USER REGISTERED ==========");
    console.log("Username:", username);
    console.log("Name:", name);
    console.log("Status: Registration successful");
    console.log("=====================================\n");

    response.status(201).send({
      message: "User created successfully"
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error.message);

    response.status(500).send({
      error: "Internal server error"
    });
  }
});

// Login API
app.post("/login/", async (request, response) => {
  try {
    const { username, password } = request.body;

    if (!username || !password) {
      console.log("LOGIN FAILED: Username and password are required");

      return response.status(400).send({
        error: "Username and password are required"
      });
    }

    const user = await db.get(
      'SELECT * FROM "user" WHERE username = ?',
      [username]
    );

    if (!user) {
      console.log("LOGIN FAILED: Invalid username");
      console.log("Username:", username);

      return response.status(400).send({
        error: "Invalid username"
      });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatched) {
      console.log("LOGIN FAILED: Invalid password");
      console.log("Username:", username);

      return response.status(400).send({
        error: "Invalid password"
      });
    }

    const payload = {
      username: username
    };

    const jwtToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1h"
    });

    console.log("\n============= USER LOGIN ============");
    console.log("Username:", username);
    console.log("Name:", user.name);
    console.log("Status: Login successful");
    console.log("JWT Token: Generated successfully");
    console.log("=====================================\n");

    response.status(200).send({
      jwt_token: jwtToken
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error.message);

    response.status(500).send({
      error: "Internal server error"
    });
  }
});

// Start server
const startServer = async () => {
  if (!JWT_SECRET) {
    console.error("Unable to start server: JWT_SECRET environment variable is required.");
    process.exit(1);
  }

  try {
    await initializeDB();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
      console.log("Waiting for Register and Login requests...");
    });

  } catch (error) {
    console.error("Unable to start server:", error.message);
    process.exit(1);
  }
};

startServer();
