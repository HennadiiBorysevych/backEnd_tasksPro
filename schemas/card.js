const Joi = require("joi");

const createCardSchema = Joi.object({
  title: Joi.string().required(),
  cardOwner: Joi.string().required(),
  orderTask: Joi.number().required(),
});

const updateCardSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid("Without", "Low", "Medium", "High"),
  deadline: Joi.string(),
  cardOwner: Joi.string(),
  orderTask: Joi.number(),
});

module.exports = { createCardSchema, updateCardSchema };
