const { HttpError } = require("../../helpers");
const { User, Token } = require("../../models");

const logoutUser = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { token: "" });

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  const tokenRefresh = await Token.findOneAndRemove({ userId: _id });

  if (!tokenRefresh) {
    throw HttpError(401, "Not authorized");
  }

  res.status(204);
  res.json();
};

module.exports = logoutUser;
