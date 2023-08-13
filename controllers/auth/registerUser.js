const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw HttpError(401, "Error. Provide all required fields");
  }

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201);
  res.json({
    code: 201,
    message: "User registration success",
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

module.exports = registerUser;
