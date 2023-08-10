const Joi = require("joi");

const themeSchema = Joi.object({
  theme: Joi.string().valid("Light", "Violet", "Dark").required(),
});

module.exports = { themeSchema };
