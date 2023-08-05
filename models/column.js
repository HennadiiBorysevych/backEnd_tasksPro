const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

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
    orderColumn: {
      type: Number,
      required: [true, "Order cullumn  required"],
    },
  },
  { versionKey: false, timestamps: true }
);

columnSchema.post("save", handleMongooseError);

const Column = model("column", columnSchema);

module.exports = { Column };
