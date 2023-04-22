const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    jwt.sign(
      { user: req.user },
      process.env.SECRET,
      { expiresIn: "14d" },
      (err, token) => {
        if (err) {
          return next(err);
        }
        return res.json({ token, user: req.user });
      }
    );
  }
);

module.exports = router;
