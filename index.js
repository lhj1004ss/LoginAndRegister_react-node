const express = require("express");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const config = require("./config/key");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

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
app.post("/login", (req, res) => {
  // find a requested email from database

  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "your email is invaild",
      });
    }
    // if there is email from database check password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "your password is invalid",
        });
    });
    // if password and email are correct, make token
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);

      //save token into cookie, but i can save other place too, like local or session storage
      res
        .cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id });
    });
  });
});

app.listen(5000);
