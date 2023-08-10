const bcrypt = require("bcrypt");
const fs = require("fs/promises");

const { cloudinary } = require("../../service");
const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  const { name, email, password } = req.body;
  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }

  if (email) {
    updateFields.email = email;
  }

  if (password) {
    const hashPassword = await bcrypt.hash(password, 10);
    updateFields.password = hashPassword;
  }
  if (req.file && req.file.path) {
    await cloudinary.uploader.upload(
      req.file.path,
      async function (err, result) {
        if (err) {
          next(HttpError(500, "Error"));
          console.log(err.message);
        } else {
          updateFields.avatarURL = result.url;
          await fs.unlink(req.file.path);
        }
      }
    );
  }
  updateUserData();
  async function updateUserData() {
    try {
      const updatedUser = await User.findByIdAndUpdate(_id, updateFields, {
        new: true,
      });

      if (!updatedUser) {
        return next(HttpError(404, "User not found"));
      }

      const { name, email, theme, avatarURL } = updatedUser;
      res.status(200).json({
        message: "Update success",
        user: { name, email, theme, avatarURL },
      });
    } catch (err) {
      next(HttpError(500, "Error updating user"));
      console.log(err.message);
    }
  }
};

module.exports = updateUser;
