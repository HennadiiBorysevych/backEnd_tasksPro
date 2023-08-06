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
      required: [
        true,
        "Сolumn must contain a properly filled <columnOwner> field",
      ],
    },
    orderColumn: {
      type: Number,
      required: [
        true,
        "Сolumn must contain a properly filled <orderColumn> field",
      ],
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
