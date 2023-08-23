const bcrypt = require("bcrypt");
const fs = require("fs/promises");

const { cloudinary } = require("../../service");
const { HttpError } = require("../../helpers");
const { User, Token } = require("../../models");

const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  const { name, email, password, newPassword } = req.body.user;

  console.log("req.body---->", req.body);

  const updateFields = {};

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  if (name) {
    updateFields.name = name;
  }

  if (email) {
    if (!password) {
      throw HttpError(400, "Password required");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Password is wrong");
    }

    updateFields.email = email;

    await Token.findOneAndUpdate(
      { userEmail: user.email },
      { userEmail: email }
    );
  }

  if (newPassword) {
    if (!password) {
      throw HttpError(400, "Password required");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw HttpError(401, "Old password is wrong");
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
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

  const updatedUser = await User.findByIdAndUpdate(_id, updateFields, {
    new: true,
  });

  if (!updatedUser) {
    return next(HttpError(404, "Update user not found"));
  }

  res.status(200).json({
    message: "Update success",
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      theme: updatedUser.theme,
      avatarURL: updatedUser.avatar,
    },
  });

  // updateUserData();
  // async function updateUserData() {
  //   try {
  //     const updatedUser = await User.findByIdAndUpdate(_id, updateFields, {
  //       new: true,
  //     });

  //     if (!updatedUser) {
  //       return next(HttpError(404, "User not found"));
  //     }

  //     const { name, email, theme, avatarURL } = updatedUser;
  //     res.status(200).json({
  //       message: "Update success",
  //       user: { name, email, theme, avatarURL },
  //     });
  //   } catch (err) {
  //     next(HttpError(500, "Error updating user"));
  //     console.log(err.message);
  //   }
  // }
};

module.exports = updateUser;
