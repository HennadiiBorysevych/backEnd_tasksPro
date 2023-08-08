const Joi = require("joi");

const createBoardSchema = Joi.object({
  title: Joi.string().required(),
  icon: Joi.string().valid(
    "icon-puzzle-piece",
    "icon-Project",
    "icon-lightning",
    "icon-hexagon",
    "icon-colors",
    "icon-loading",
    "icon-container",
    "icon-star"
  ),
  isActive: Joi.boolean(),
  background: Joi.string(),
});

const updateBoardSchema = Joi.object({
  title: Joi.string(),
  icon: Joi.string(),
  isActive: Joi.boolean(),
  background: Joi.string(),
});

module.exports = { createBoardSchema, updateBoardSchema };
