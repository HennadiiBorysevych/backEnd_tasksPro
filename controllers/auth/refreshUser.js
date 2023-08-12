const { HttpError } = require("../../helpers");
const { User, Token } = require("../../models");
const jwt = require("jsonwebtoken");

const { SECRET_KEY, REFRESH_KEY } = process.env;

const refreshUser = async (req, res) => {
  const { userEmail } = req.body;

  if (!userEmail || !req.body.tokenRefresh) {
    throw HttpError(400, "Error. Provide all required fields");
  }
  const userRefresh = await Token.findOne({ userEmail });

  if (!userRefresh) {
    throw HttpError(401, "Email is not authorized");
  }

  if (req.body.tokenRefresh !== userRefresh.tokenRefresh) {
    throw HttpError(401, "Token is not valid");
  }

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    throw HttpError(401, "User is not authorized");
  }

  const payload = {
    id: user._id,
  };

  const token = await jwt.sign(payload, SECRET_KEY, { expiresIn: "11h" });
  const tokenRefresh = await jwt.sign(payload, REFRESH_KEY, {
    expiresIn: "23h",
  });

  await User.findByIdAndUpdate(user._id, { token });
  await Token.findOneAndUpdate({ userEmail }, { tokenRefresh });

  res.status(200);
  res.json({
    code: 200,
    message: "Success",
    token,
    tokenRefresh,
  });
};

module.exports = refreshUser;
