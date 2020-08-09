const express = require("express");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

// useNewUrlParser: true, to remove deprecate warning
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello world hehehe"));

app.post("/register", (req, res) => {
  //put info of register from client(user) into database
  const user = new User(req.body);
  // save to DB
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(5000);
