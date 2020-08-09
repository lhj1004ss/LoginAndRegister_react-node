const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  // trim is to remove space between letters
  // unique allows only 1 email
  email: { type: String, trim: true, unique: 1 },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  // default 0 is normal user
  role: { type: Number, default: 0 },
  image: String,
  token: { type: String },
  tokenExp: { type: Number },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
