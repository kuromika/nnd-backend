const User = require("../models/user");
const { validatePassword } = require("../utils/password");

const verify = async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false, "Username doesn't exist");
    }
    const isValid = validatePassword(password, user.hash, user.salt);
    if (!isValid) {
      return done(null, false, "Incorrect password");
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

module.exports = verify;
