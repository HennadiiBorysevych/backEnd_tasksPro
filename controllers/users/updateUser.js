const bcrypt = require("bcrypt");

const { cloudinary } = require("../../service")
const { HttpError } = require("../../helpers")
const { User }  = require("../../models")

// const updateUser = async (req, res, next) => {
//     cloudinary.uploader.upload(req.file.path, async function (err, result) {
//         if (err) {
//             next(HttpError(500, "Error"))
//             console.log(err.message);
//         } else {

//             const  _id  = "64cf97852829b57a75fc6cba";

//        try {
//             const updatedUser = await User.findByIdAndUpdate(
//                 _id,
//                 { avatarURL: result.url },
//                 { new: true } 
//                 );
//                 if (!updatedUser) {
//                 return next(HttpError(404, "User not found"));
//                     }
//                     res.status(200).json({
//                         data: updatedUser.avatarURL,
//                     });
//                 } catch (err) {
//                     next(HttpError(500, "Error updating user"));
//                     console.log(err.message);
//                 }
//             }
//         });
//         }

// module.exports = updateUser;


const updateUser = async (req, res, next) => {
    const {_id } = req.user;
    const { name, email, password } = req.body;
    if (req.file && req.file.path) {
        console.log("updateAvatar started")
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
                } catch (err) {
                    next(HttpError(500, "Error updating user"));
                    console.log(err.message);
                }
            }
        });
    }
    if (name) {
        console.log("updateName started")
        console.log(name)
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
                name: updatedUser.name,
            });
        } catch (err) {
            next(HttpError(500, "Error updating user"));
            console.log(err.message);
        }
    }
    if (email) {
        console.log("updateEmail started")
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
                email: updatedUser.email,
            });
        } catch (err) {
            next(HttpError(500, "Error updating user"));
            console.log(err.message);
        }
    }
    if (password) {
        console.log("updatePassword started")
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
                password: updatedUser.password,
            });
        } catch (err) {
            next(HttpError(500, "Error updating user"));
            console.log(err.message);
        }
    }
};
module.exports = updateUser;