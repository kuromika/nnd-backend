const { isAuth } = require("../middleware/authentication");
const findDocument = require("../middleware/mongoose");
const Comment = require("../models/comment");

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({});
    return res.json(comments);
  } catch (err) {
    return next(err);
  }
};

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
  findDocument(Comment),
  async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.user.toString() !== req.user.id) {
        const error = new Error("Only the creator can update their comments");
        error.status = 403;
        return next(error);
      }
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

const deletePostComment = [
  isAuth,
  findDocument(Comment),
  async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.user.toString() !== req.user.id) {
        const error = new Error("Only the creator can delete their comments");
        error.status = 403;
        return next(error);
      }
      const deletedComment = await Comment.findByIdAndDelete(req.params.id);
      return res.json(deletedComment);
    } catch (err) {
      return next(err);
    }
  },
];

const getComment = [
  findDocument(Comment),
  async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id);
      return res.json(comment);
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  getPostComments,
  createPostComment,
  updatePostComment,
  deletePostComment,
  getComments,
  getComment,
};
