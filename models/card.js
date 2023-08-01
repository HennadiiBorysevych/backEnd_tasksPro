const { Schema, model } = require("mongoose");
const { mongooseError } = require("../helpers");

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
      enum: ["Without", "Low", "Medium", "High"],
      default: "Without",
    },
    deadline: {
      type: Date,
      default: Date.now(),
    },
    cardOwner: {
      type: Schema.Types.ObjectId,
      ref: "column",
    },
  },
  { versionKey: false, timestamps: true }
);

cardSchema.post("save", mongooseError);

const Card = model("card", cardSchema);

module.exports = { Card };
