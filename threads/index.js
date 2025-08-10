const express = require("express");
const { url } = require("inspector");
const app = express();
const port = 4040;
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let userid = "Hello";
let userdata = [
  {
    username: "ms first user",
    dp: "",
  },
];
app.listen(port, () => {
  console.log("started listeningg");
});
app.get("/posts", (req, res) => {
  res.render("index.ejs");
});
app.get("/posts/add", (req, res) => {
  res.render("add.ejs", { userid });
});
app.post("/addedPost", (req, res) => {
  res.redirect("/posts");
  console.log(req.body);
});
