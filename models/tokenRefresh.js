const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const tokenRefreshSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: [true, "userId field, must be filled in correctly"],
    },
    tokenRefresh: {
      type: String,
      required: [true, "tokenRefresh field, must be filled in correctly"],
    },
  },
  { versionKey: false, timestamps: true }
);
tokenRefreshSchema.post("save", handleMongooseError);

const Token = model("token", tokenRefreshSchema);

module.exports = {
  Token,
};
