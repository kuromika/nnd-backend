const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const { generatePassword } = require("../utils/password");

const getUsers = async (req, res, next) => {
  const posts = await User.find({}).exec();
  res.json(posts);
  next();
};

const createUser = [
  body("username", "Username must be at least 6 characters long")
    .trim()
    .isLength({ min: 6 })
    .not()
    .matches(/\s/)
    .withMessage("Username can't contain spaces"),
  body("password", "Password must be at least 8 characters long ")
    .trim()
    .isLength({ min: 8 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.payload = errors.array();
      error.status = 400;
      return next(error);
    }
    const { generatedHash, salt } = generatePassword(req.body.password);
    const newUser = new User({
      username: req.body.username,
      hash: generatedHash,
      salt,
    });
    try {
      await newUser.save();
    } catch (err) {
      if (err.code === 11000) {
        const error = new Error("Username already exists");
        error.status = 400;
        return next(error);
      }
      return next(err);
    }
    return res.json(newUser);
  },
];

module.exports = { getUsers, createUser };
