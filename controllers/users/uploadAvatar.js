const { cloudinary } = require("../../service")
const { HttpError } = require("../../helpers")
//const { User } = require("../../models")

const uploadAvatar = async (req, res, next) => {
    cloudinary.uploader.upload(req.file.path, function (err, result) {
        if (err) {
            next(HttpError(500, "Error"))
            console.log(err.message);
        }
        res.status(200).json({
            data: result.url,
        })
    })
    //await User.findByIdAndUpdate(_id, { avatarURL: result.url.data });
}


module.exports = uploadAvatar;