const { HttpError } = require("../../helpers");
const { User, Session } = require("../../models/user");

const logoutUser = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { token: "" });
  const currentSession = req.session;
  const sessionDeletionResult = await Session.deleteOne({ _id: currentSession._id });

  if (!user || !sessionDeletionResult) {
   throw HttpError(401, "Not authorized");
  }
  res.status(204);
  res.json();
};

module.exports = logoutUser;
