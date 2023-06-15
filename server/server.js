const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

const mysql = require("mysql");
const database = require("./db/knex");
const cors = require("cors");
app.use(cors());

app.get("/api", (req, res) => {
  res.json({ text: "Hello World!!" });
});

app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3"] });
});

app.get("/api/tasks", (req, res) => {
  database("task_table")
    .select()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.error("Error retrieving messages:", error);
      res.status(500).json({ error: "Failed to retrieve messages" });
    });
});

app.post("/api/tasks", (req, res) => {
  const { assignee, task, created_at, due_date } = req.body;

  database("task_table")
    .insert({ assignee, task, created_at, due_date })
    .returning("*")
    .then((newTask) => {
      res.status(201).json(newTask[0]);
    })
    .catch((error) => {
      console.error("Error inserting message:", error);
      res.status(500).json({ error: "Failed to insert message" });
    });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
