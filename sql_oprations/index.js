const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();
const port = 8080;
const mysql = require("mysql2");
const path = require("path");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "",
  password: "",
});
//home
app.get("/", (req, res) => {
  let q = "select count(*) from newtable";
  try {
    conn.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
  }
});
//show users
app.get("/user", (req, res) => {
  let q = "select * from newtable";
  try {
    conn.query(q, (err, users) => {
      if (err) throw err;
      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    res.send(err);
  }
});
//edit route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `select * from newtable where id='${id}'`;
  try {
    conn.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
  }
});
//update route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: newpassWord, username: formName } = req.body;
  let q = `select * from newtable where id='${id}'`;
  try {
    conn.query(q, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let user = result[0];
        if (newpassWord !== user.password) {
          res.send("wrong password");
        } else {
          let q = `update newtable set username='${formName}' where id='${id}'`;
          try {
            conn.query(q, (err, result) => {
              if (err) {
                console.log(err);
              }
              res.redirect("/user");
            });
          } catch (err) {
            res.send("Not found");
          }
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});
//delete route
app.get("/user/:id/deletepage", (req, res) => {
  let { id } = req.params;
  let q = `select * from newtable where id='${id}'`;
  conn.query(q, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let user = result[0];
      res.render("delete.ejs", { user });
    }
  });
});
app.delete("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let { email: formEmail, password: formPassword } = req.body;
  let q = `select * from newtable where id='${id}'`;
  try {
    conn.query(q, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let user = result[0];
        if (formEmail != user.email && formPassword != user.password) {
          res.send("Wrong");
        } else {
          let q1 = `delete from newtable where id='${user.id}'`;
          try {
            conn.query(q1, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.redirect("/user");
              }
            });
          } catch (err) {
            console.log(err);
          }
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});
//add route
app.get("/user/add", (req, res) => {
  res.render("add.ejs");
});
app.post("/user/add", (req, res) => {
  let data = [];
  let { id, username, email, password } = req.body;
  data.push([id, username, email, password]);

  let q = `insert into newtable (id,username,email,password)values ?`;
  try {
    conn.query(q, [data], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/user");
      }
    });
  } catch (err) {}
});
app.listen(port, () => {
  console.log("Server is listening to route 8080");
});
