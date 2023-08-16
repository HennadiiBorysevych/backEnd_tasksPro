const bcrypt = require("bcrypt");
const fs = require("fs/promises");

const { cloudinary } = require("../../service");
const { HttpError } = require("../../helpers");
const { User, Token } = require("../../models");

const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  const { name, email, password, passwordOld } = req.body;
  const updateFields = {};
  const user = await User.findById(_id);

  if (name) {
    updateFields.name = name;
  }

  if (email) {
    updateFields.email = email;
    if (!user) {
      throw HttpError(401, "User unauthorized");
    }
    await Token.findOneAndUpdate(
      { userEmail: user.email },
      { userEmail: email }
    );
  }

  if (password) {
    if (!passwordOld) {
      throw HttpError(400, "passwordOld required");
    }
    if (!user) {
      throw HttpError(401, "User unauthorized");
    }
    const passwordCompare = await bcrypt.compare(passwordOld, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Old password is wrong");
    }
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
