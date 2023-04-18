const Like = require("../models/like");

const getLikes = async (req, res, next) => {
  try {
    const likes = await Like.find({});
    return res.json(likes);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getLikes };
