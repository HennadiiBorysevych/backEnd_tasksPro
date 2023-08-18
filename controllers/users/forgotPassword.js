const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const forgotPassword = async (req, res) => {
  const { passwordNew } = req.body;
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized");
  }
  if (!token) {
    throw HttpError(401, "No token");
  }
  const { id } = jwt.verify(token, SECRET_KEY);

  const password = await bcrypt.hash(passwordNew, 10);

  const result = await User.findByIdAndUpdate(
    id,
    { password },
    {
      new: true,
    }
  ).select({ createdAt: 0, updatedAt: 0 });

  if (!result) {
    throw HttpError(500, "Error update password ");
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Success",
  });
};

module.exports = forgotPassword;
