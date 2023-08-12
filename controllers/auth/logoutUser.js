const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");
const { schemas } = require("../../models/user")
const mongoose = require('mongoose');

const logoutUser = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { token: "" });
  const currentSession = req.session;
  const Session = mongoose.model("Session", schemas.sessionSchema);
  const session = await Session.deleteOne({ _id: currentSession._id });

  if (!user || !session) {
    throw HttpError(401, "Not authorized");
  }
  res.status(204);
  res.json();
};

module.exports = logoutUser;
