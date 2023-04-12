const { Strategy, ExtractJwt } = require("passport-jwt");
const verify = require("../verify");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

module.exports = new Strategy(opts, verify);
