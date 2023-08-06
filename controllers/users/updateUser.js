const bcrypt = require("bcrypt");

const { cloudinary } = require("../../service")
const { HttpError } = require("../../helpers")
const { User }  = require("../../models")

const updateUser = async (req, res, next) => {
    const {_id } = req.user;
    const { name, email, password } = req.body;
    if (req.file && req.file.path) {
        cloudinary.uploader.upload(req.file.path, async function (err, result) {
            if (err) {
                next(HttpError(500, "Error"))
                console.log(err.message);
            } else {
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
                    message = res.data;
                } catch (err) {
                    next(HttpError(500, "Error updating user"));
                    console.log(err.message);
                }
            }
        });
    }
    if (name) {
        try {
            console.log(User)
            const updatedUser = await User.findByIdAndUpdate(
                _id,
                { name },
                { new: true }
            );
            if (!updatedUser) {
                return next(HttpError(404, "User not found"));
            }
            res.status(200).json({
                ...res.json,
                name: updatedUser.name,
            });
        
        } catch (err) {
            next(HttpError(500, "Error updating user"));
            console.log(err.message);
        }
    }
    if (email) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                _id,
                { email },
                { new: true }
            );
            if (!updatedUser) {
                return next(HttpError(404, "User not found"));
            }
            res.status(200).json({
                ...res.json,
                email: updatedUser.email,
            });
        } catch (err) {
            next(HttpError(500, "Error updating user"));
            console.log(err.message);
        }
    }
    if (password) {
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const updatedUser = await User.findByIdAndUpdate(
                _id,
                { password: hashPassword },
                { new: true }
            );
            if (!updatedUser) {
                return next(HttpError(404, "User not found"));
            }
            res.status(200).json({
                ...res.json,
                password: "Password changed",
            });
        } catch (err) {
            next(HttpError(500, "Error updating user"));
            console.log(err.message);
        }
    }
};
module.exports = updateUser;