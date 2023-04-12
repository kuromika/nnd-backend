const crypto = require("crypto");

function generatePassword(password) {
  const salt = crypto.randomBytes(32).toString("hex");
  const generatedHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return { generatedHash, salt };
}

function validatePassword(password, hash, salt) {
  const verifier = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return verifier === hash;
}

module.exports = { generatePassword, validatePassword };
