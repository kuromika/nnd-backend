const Comment = require("../models/comment");

const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId });
    return res.json(comments);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getPostComments };
