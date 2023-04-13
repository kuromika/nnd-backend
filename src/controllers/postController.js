const Post = require("../models/post");
const { isAdmin } = require("../middleware/authentication");

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).exec();
    return res.json(posts);
  } catch (err) {
    return next(err);
  }
};

const createPost = [
  isAdmin,
  async (req, res, next) => {
    const newPost = new Post({
      content: req.body.content,
      user: req.user.id,
      isPublished: req.body.isPublished,
    });
    try {
      await newPost.save();
      return res.json(newPost);
    } catch (err) {
      return next(err);
    }
  },
];

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.json(post);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getPosts, createPost, getPost };
