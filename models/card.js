const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    priority: {
      type: String,
      enum: ["without", "low", "medium", "high"],
      default: "without",
    },
    deadline: {
      type: Date,
      default: Date.now(),
    },
    cardOwner: {
      type: Schema.Types.ObjectId,
      ref: "card",
      required: [true, "Task must contain a properly filled <cardOwner> field"],
    },
    orderTask: {
      type: Number,
      required: [true, "Order task required"],
    },
  },
  { versionKey: false, timestamps: true }
);

cardSchema.post("save", handleMongooseError);

const Card = model("card", cardSchema);

module.exports = { Card };
