const { cloudinary } = require("../../service");
const { HttpError } = require("../../helpers");
const { User } = require("../../models");

const uploadAvatar = async (req, res, next) => {
  cloudinary.uploader.upload(req.file.path, async function (err, result) {
    if (err) {
      next(HttpError(500, "Error"));
      console.log(err.message);
    } else {
      const { _id } = req.user;

      try {
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          { avatarURL: result.url },
          { new: true }
        );
        if (!updatedUser) {
          return next(HttpError(404, "User not found"));
        }
        res.status(200).json({
          data: updatedUser.avatarURL,
        });
      } catch (err) {
        next(HttpError(500, "Error updating user"));
        console.log(err.message);
      }
    }
  });
};

module.exports = uploadAvatar;
