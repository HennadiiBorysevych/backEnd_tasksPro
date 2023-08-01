const { Schema, model } = require("mongoose");

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    columnOwner: {
      type: Schema.Types.ObjectId,
      ref: "board",
    },
  },
  { versionKey: false, timestamps: true }
);

const Column = model("column", columnSchema);

module.exports = { Column };
