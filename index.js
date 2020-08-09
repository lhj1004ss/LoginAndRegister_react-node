const express = require("express");

const app = express();
const mongoose = require("mongoose");
// useNewUrlParser: true, to remove deprecate warning
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
mongoose
  .connect(
    "mongodb+srv://hyoje:dOTKTmeFknDqPdL5@cluster0.v7mbs.mongodb.net/newuser?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello world"));

app.listen(5000);
