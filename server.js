const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const app = express();

app.use(bodyParser.json());
const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",

      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "sally",
      email: "john@gmail.com",

      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password == database.users[0].password
  ) {
    res.json("sucess");
  } else {
    res.status(400).json("error logging in");
  }
  res.json("sigin in");
});
app.listen(3000, () => {
  console.log("app is running on port 3000");
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password,null, null, function(err,hash) {
    console.log(hash)
  })
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;

      return res.json(user);
    }
  });

  if (!found) {
    res.status(404).json("no such user");
  }
});

app.post("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      user.entries++;
      found = true;
      return res.json(user.entries);
    }
  });

  if (!found) {
    res.status(404).json("not found");
  }
});
