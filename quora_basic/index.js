const express = require("express");
const app = express();
const port = 4040;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let posts = [
  {
    id: uuidv4(),
    username: "thejas",
    content: "i love coding",
  },
  {
    id: uuidv4(),
    username: "apna_college",
    content: "i teach coding",
  },
  {
    id: uuidv4(),
    username: "Hello",
    content: "Its a me a mario",
  },
];

app.listen(port, () => {
  console.log("listening to port 4040");
});

// Root redirect to posts list
app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let { content } = req.body;
  if (typeof content !== "string" || content.trim().length === 0) {
    return res.status(400).send("Content is required");
  }
  let post = posts.find((p) => id === p.id);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  post.content = content.trim();
  res.redirect("/posts");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  if (
    typeof username !== "string" ||
    username.trim().length === 0 ||
    typeof content !== "string" ||
    content.trim().length === 0
  ) {
    return res.status(400).send("Username and content are required");
  }
  let newId = uuidv4();
  posts.push({ id: newId, username: username.trim(), content: content.trim() });
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let post = posts.find((p) => id === p.id);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("edit.ejs", { post });
});
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log("working");
  const existingLength = posts.length;
  posts = posts.filter((p) => id !== p.id);
  if (posts.length === existingLength) {
    return res.status(404).send("Post not found");
  }
  res.redirect("/posts");
});

// Global 404 for unknown routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});
