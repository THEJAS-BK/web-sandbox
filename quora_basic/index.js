const express = require("express");
const app = express();
const port = 4040;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
uuidv4();
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

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let { content } = req.body;
  let post = posts.find((p) => id === p.id);
  post.content = content;
  res.redirect("/posts");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let newId = uuidv4();
  posts.push({ id: newId, username: username, content: content });
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log("working");
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
