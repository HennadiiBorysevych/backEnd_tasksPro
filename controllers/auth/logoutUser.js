const { HttpError } = require("../../helpers");
const { User, Token, Session } = require("../../models");

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  
  const user = await User.findByIdAndUpdate(_id, { token: "" });
  const currentSession = req.session;
  const sessionDeletionResult = await Session.deleteOne({ _id: currentSession._id });
  if (!user || !sessionDeletionResult) {
    throw HttpError(401, "User is not authorized");
  }

  const tokenRefresh = await Token.findOneAndRemove({ userEmail: user.email });

  if (!tokenRefresh) {
    throw HttpError(401, "User email invalid or unauthorized");
  }

  res.status(204);
  res.json();
};

module.exports = logoutUser;
