const Post = require("../models/post");
const { isAdmin } = require("../middleware/authentication");
const findDocument = require("../middleware/mongoose");

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).sort({ date: -1 }).exec();
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

const getPost = [
  findDocument(Post),
  async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      return res.json(post);
    } catch (err) {
      return next(err);
    }
  },
];

const updatePost = [
  isAdmin,
  findDocument(Post),
  async (req, res, next) => {
    const update = {
      content: req.body.content,
      isPublished: req.body.isPublished,
    };
    try {
      const updatedDoc = await Post.findByIdAndUpdate(req.params.id, update, {
        new: true,
      });
      return res.json(updatedDoc);
    } catch (err) {
      return next(err);
    }
  },
];

const deletePost = [
  isAdmin,
  findDocument(Post),
  async (req, res, next) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      return res.json(deletedPost);
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = { getPosts, createPost, getPost, updatePost, deletePost };
