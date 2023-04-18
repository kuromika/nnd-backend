const { isAuth } = require("../middleware/authentication");
const Comment = require("../models/comment");

const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId });
    return res.json(comments);
  } catch (err) {
    return next(err);
  }
};

const createPostComment = [
  isAuth,
  async (req, res, next) => {
    try {
      const newComment = new Comment({
        content: req.body.content,
        user: req.user,
        post: req.params.postId,
      });
      newComment.save();
      return res.json(newComment);
    } catch (err) {
      return next(err);
    }
  },
];

const updatePostComment = [
  isAuth,
  async (req, res, next) => {
    try {
      const update = {
        content: req.body.content,
      };
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        update,
        { new: true }
      );
      return res.json(updatedComment);
    } catch (err) {
      return next(err);
    }
  },
];
module.exports = { getPostComments, createPostComment, updatePostComment };
