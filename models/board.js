const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      enum: [
        "icon-puzzle-piece",
        "icon-Project",
        "icon-lightning",
        "icon-hexagon",
        "icon-colors",
        "icon-loading",
        "icon-container",
        "icon-star",
      ],
      default: "icon-Project",
    },
    background: {
      type: String,
      default: "empty",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
const Board = model("board", boardSchema);

boardSchema.post("save", handleMongooseError);

module.exports = { Board };
