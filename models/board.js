const { Schema, model } = require("mongoose");

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      enum: [
        "icon-four-circles",
        "icon-star",
        "icon-spiner",
        "icon-puzzle",
        "icon-container",
        "icon-lightning",
        "icon-three-circles",
        "icon-diamond",
      ],
      default: "icon-four-circles",
    },
    background: {
      type: String,
      default: "empty",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);
const Board = model("board", boardSchema);

module.exports = { Board };
