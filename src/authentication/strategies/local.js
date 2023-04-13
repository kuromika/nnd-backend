const LocalStrategy = require("passport-local").Strategy;
const { verifyLocal } = require("../verify");

module.exports = new LocalStrategy(verifyLocal);
