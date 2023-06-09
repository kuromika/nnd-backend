const Like = require("../models/like");
const { isAuth } = require("../middleware/authentication");
const checkOwnership = require("../middleware/permissions");
const findDocument = require("../middleware/mongoose");

const getLikes = async (req, res, next) => {
  try {
    const likes = await Like.find({});
    return res.json(likes);
  } catch (err) {
    return next(err);
  }
};

const getDocLikes = (model) => async (req, res, next) => {
  try {
    const likes = await Like.find({ docModel: model, doc: req.params.id });
    return res.json(likes);
  } catch (err) {
    return next(err);
  }
};

const createLike = (model) => [
  isAuth,
  async (req, res, next) => {
    try {
      const like = {
        doc: req.params.id,
        docModel: model,
        user: req.user.id,
      };
      const alreadyLiked = await Like.find(like);
      if (alreadyLiked.length) {
        const error = new Error("You can only like something once");
        error.status = 403;
        return next(error);
      }
      const newLike = new Like(like);
      const savedLike = await newLike.save();
      return res.json(savedLike);
    } catch (err) {
      return next(err);
    }
  },
];

const deleteLike = [
  isAuth,
  findDocument(Like),
  checkOwnership(Like),
  async (req, res, next) => {
    try {
      const deleted = await Like.findByIdAndDelete(req.params.id);
      return res.json(deleted);
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = { getLikes, getDocLikes, createLike, deleteLike };
