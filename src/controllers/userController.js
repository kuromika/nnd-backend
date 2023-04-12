const User = require("../models/user");

const getUsers = async (req, res, next) => {
  const posts = await User.find({}).exec();
  res.json(posts);
  next();
};

module.exports = { getUsers };
