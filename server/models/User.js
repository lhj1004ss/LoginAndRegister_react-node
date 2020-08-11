const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

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
// before saving data to DB, do password encrypt
userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // plain password==1234, database password=ASD!@#!!S
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    // else
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  // make token using jsonwebtoken
  var token = jwt.sign(user._id.toHexString(), "userToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;
  // decode token
  jwt.verify(token, "userToken", function (err, decoded) {
    // using user id, find user id. then, check that token from client is equal to token from DB

    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};
const User = mongoose.model("User", userSchema);

module.exports = { User };
