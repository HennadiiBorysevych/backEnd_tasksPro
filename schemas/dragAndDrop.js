const Joi = require("joi");

const columnAndTask = Joi.object({
  id: Joi.string().required(),
  order: Joi.number().integer().required(),
});

// Оголошення схем для масиву об'єктів
const columnAndTaskSchema = Joi.array().items(columnAndTask);

const taskToColumnSchema = Joi.object({
  idTask: Joi.string().required(),
  idColumnNew: Joi.string().required(),
  dataOld: Joi.array().items(columnAndTask).required(),
  dataNew: Joi.array().items(columnAndTask).required(),
});

module.exports = {
  columnAndTaskSchema,
  taskToColumnSchema,
};
