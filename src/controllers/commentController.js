const { isAuth } = require("../middleware/authentication");
const findDocument = require("../middleware/mongoose");
const checkOwnership = require("../middleware/permissions");
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
    const comments = await Comment.find({ post: req.params.postId })
      .sort({
        date: -1,
      })
      .populate("user");
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
  checkOwnership(Comment),
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

const deletePostComment = [
  isAuth,
  findDocument(Comment),
  checkOwnership(Comment),
  async (req, res, next) => {
    try {
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
