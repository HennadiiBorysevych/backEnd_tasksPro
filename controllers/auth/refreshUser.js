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
    throw HttpError(401, "User email invalid or unauthorized");
  }

  const validateTokenResult = jwt.verify(req.body.tokenRefresh, REFRESH_KEY);

  if (
    req.body.tokenRefresh !== userRefresh.tokenRefresh ||
    !validateTokenResult
  ) {
    await User.findOneAndUpdate({ userEmail }, { token: "" });
    await Token.findOneAndRemove({ userEmail });
    throw HttpError(403, "Refresh token invalid or unauthorized");
  }

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    throw HttpError(401, "User email invalid or unauthorized");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "11h" });
  const tokenRefresh = jwt.sign(payload, REFRESH_KEY, {
    expiresIn: "23d",
  });

  await User.findByIdAndUpdate(user._id, { token });
  await Token.findOneAndUpdate({ userEmail }, { tokenRefresh });

  res.status(200);
  res.json({
    code: 200,
    message: "Refresh success",
    token,
    tokenRefresh,
  });
};

module.exports = refreshUser;
