const bcrypt = require("bcrypt");

const { cloudinary } = require("../../service");
const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  const { name, email, password } = req.body.updatedUser;
  let updateFields = {};

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
    cloudinary.uploader.upload(req.file.path, async function (err, result) {
      if (err) {
        next(HttpError(500, "Error"));
        console.log(err.message);
      } else {
        updateFields.avatarURL = result.url;
      }
    });
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

      res.status(200).json({ message: "Update success" });
    } catch (err) {
      next(HttpError(500, "Error updating user"));
      console.log(err.message);
    }
  }
};

module.exports = updateUser;
