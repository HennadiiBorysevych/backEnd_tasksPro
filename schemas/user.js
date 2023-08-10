const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const updateSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().min(6),
});

module.exports = { updateSchema };
