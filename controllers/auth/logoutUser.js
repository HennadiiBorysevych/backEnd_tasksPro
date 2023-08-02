const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const logoutUser = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { token: "" });

  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  res.status(401);
  res.json({
    code: 401,
    message: "Unauthorized",
  });
};

module.exports = logoutUser;
