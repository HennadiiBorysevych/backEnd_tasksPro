const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
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

const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(6),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema
};

module.exports = {
  User,
  schemas,
};
