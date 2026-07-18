import express from "express";

const router = express.Router();

// In-memory storage for users
const users = [{ id: 1, name: "John Doe", email: "john.doe@example.com" }];
let nextUserId = 1;

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  const newUser = {
    id: nextUserId++,
    name: name,
    email: email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const name = req.body.name;
  const email = req.body.email;

  if (!name && !email) {
    return res.status(400).json({ error: "name or email is required" });
  }

  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }

  res.json(user);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(index, 1);
  res.status(204).send();
});

export default router;
