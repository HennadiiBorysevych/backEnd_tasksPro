const Joi = require("joi");

const createBoardSchema = Joi.object({
  title: Joi.string().required(),
});

const updateBoardSchema = Joi.object({
  title: Joi.string(),
  icon: Joi.string(),
  isActive: Joi.boolean(),
  background: Joi.string(),
});

module.exports = { createBoardSchema, updateBoardSchema };
