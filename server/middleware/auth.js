const { User } = require("../models/User");
// next is necessary for middleware
let auth = (req, res, next) => {
  // deal with authentication

  // bring token from client cookie
  let token = req.cookies.x_auth;

  //decode token and find user
  User.findByToken(token, (err, user) => {
    //if no user, No auth
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    //if user exist, ok auth
    req.token = token;
    req.user = user;
    next();
  });
};
module.exports = { auth };
