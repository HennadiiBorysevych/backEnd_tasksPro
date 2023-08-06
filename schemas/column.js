const Joi = require("joi");

const createColumnSchema = Joi.object({
  title: Joi.string().required(),
  columnOwner: Joi.string().required(),
  orderColumn: Joi.number().required(),
});

const updateColumnSchema = Joi.object({
  title: Joi.string(),
  columnOwner: Joi.string(),
  orderColumn: Joi.number(),
});

module.exports = { createColumnSchema, updateColumnSchema };
