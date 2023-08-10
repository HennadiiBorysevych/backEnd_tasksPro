const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const themeList = ["Light", "Violet", "Dark"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    theme: {
      type: String,
      enum: themeList,
      default: "Dark",
    },
    avatarURL: {
      type: String,
      default: "",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = {
  User,
};
