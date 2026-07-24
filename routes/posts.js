import express from "express";

const router = express.Router();

// In-memory storage for posts
const posts = [];
let nextPostId = 1;

router.get("/", (req, res) => {
  res.json(posts);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  res.json(post);
});

router.post("/", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const authorId = req.body.authorId;

  if (!title || !body || !authorId) {
    return res.status(400).json({ error: "title, body, and authorId are required" });
  }

  const newPost = {
    id: nextPostId++,
    title: title,
    body: body,
    authorId: authorId,
    createdAt: new Date().toISOString(),
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  const title = req.body.title;
  const body = req.body.body;

  if (!title && !body) {
    return res.status(400).json({ error: "title or body is required" });
  }

  if (title) {
    post.title = title;
  }
  if (body) {
    post.body = body;
  }
  post.updatedAt = new Date().toISOString();

  res.json(post);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  posts.splice(index, 1);
  res.status(204).send();
});

export default router;
