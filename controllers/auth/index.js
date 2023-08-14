const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const refreshUser = require("./refreshUser");

const google = require("./google");
const googleRedirect = require("./googleRedirect");
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
  google,
  googleRedirect,
};
