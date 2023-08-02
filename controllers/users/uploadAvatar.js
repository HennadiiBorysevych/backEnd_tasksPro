const { cloudinary } = require("../../service")
//const { User } = require("../../models")

const uploadAvatar = async (req, res) => {
    cloudinary.uploader.upload(req.file.path, function (err, result) {
        if (err) {
            console.log(error);
            return res.status(500).json({
                succes: false,
                message: "Error"
            })
        }
        res.status(200).json({
            data: result.url,
        })
    })
    //await User.findByIdAndUpdate(_id, { avatarURL: result.url.data });
}


module.exports = uploadAvatar;