import express from "express";
import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";

const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the CRUD API", routes: ["/users", "/posts"] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
