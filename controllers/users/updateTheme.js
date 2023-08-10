const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const updateTheme = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select({ createdAt: 0, updatedAt: 0 });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(201);
  res.json({
    code: 201,
    data: result,
  });
};

module.exports = updateTheme;
