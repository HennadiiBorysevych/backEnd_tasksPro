const { HttpError } = require("../../helpers");
const { User, Token, Session } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY, REFRESH_KEY } = process.env;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw HttpError(400, "Error. Provide all required fields");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const userInTokensCollection = await Token.findOne({ userEmail: email });
  if (userInTokensCollection) {
    await Token.findOneAndRemove({ userEmail: email });
  }

  const newSession = await Session.create({
    uid: user._id,
  });

  const payload = {
    id: user._id,
    sid: newSession._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "11h" });
  const tokenRefresh = jwt.sign(payload, REFRESH_KEY, {
    expiresIn: "23h",
  });

  await User.findByIdAndUpdate(user._id, { token });
  await Token.create({
    userEmail: user.email,
    tokenRefresh,
  });

  res.status(200);
  res.json({
    code: 200,
    message: "Success",
    token,
    tokenRefresh,
    user: {
      name: user.name,
      email: user.email,
      theme: user.theme,
      avatarURL: user.avatarURL,
    },
  });
};

module.exports = loginUser;
