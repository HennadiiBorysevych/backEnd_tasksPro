const { Schema, model } = require("mongoose");

const themeList = ["Light", "Violet", "Dark"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      enum: themeList,
      default: "Dark",
    },
    avatarURL: String,
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = {
  User,
};
