const { Strategy, ExtractJwt } = require("passport-jwt");
const { verifyJwt } = require("../verify");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = new Strategy(opts, verifyJwt);
