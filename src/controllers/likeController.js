const Like = require("../models/like");
const { isAuth } = require("../middleware/authentication");

const getLikes = async (req, res, next) => {
  try {
    const likes = await Like.find({});
    return res.json(likes);
  } catch (err) {
    return next(err);
  }
};

const getPostLikes = async (req, res, next) => {
  try {
    const likes = await Like.find({ docModel: "Post", doc: req.params.postId });
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

module.exports = { getLikes, getPostLikes, createLike };
