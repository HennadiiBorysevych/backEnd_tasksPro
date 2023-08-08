const bcrypt = require("bcrypt");

const { cloudinary } = require("../../service");
const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }
  try {
    if (req.file && req.file.path) {
      const result = await cloudinary.uploader.upload(req.file.path);
      if (!result) {
        throw HttpError(500, "Server error");
      }
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          ...req.body,
          avatarURL: result.url,
        },
        { new: true }
      );
      if (!updatedUser) {
        throw HttpError(404, "Not found");
      }
      res.json({
        code: 201,
        message: "Update success",
        result: updatedUser,
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        ...req.body,
      },
      { new: true }
    );
    if (!updatedUser) {
      throw HttpError(404, "Not found");
    }
    res.json({
      code: 201,
      message: "Update success",
      result: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
