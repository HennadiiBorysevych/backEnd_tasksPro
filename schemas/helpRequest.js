const Joi = require("joi");

const helpRequestSchema = Joi.object({
  comment: Joi.string().required(),
  email: Joi.string().required(),
});

module.exports = {helpRequestSchema};
