const passport = require("passport");

const isAuth = passport.authenticate("jwt", { session: false });

const isAdmin = [
  isAuth,
  (req, res, next) => {
    if (!req.user.isAdmin) {
      const error = new Error("Only admins can use this resource");
      error.status = 403;
      return next(error);
    }
    return next();
  },
];

module.exports = { isAuth, isAdmin };
