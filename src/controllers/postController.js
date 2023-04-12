const Post = require("../models/post");

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).exec();
    return res.json(posts);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getPosts };
