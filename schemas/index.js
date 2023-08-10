const { createBoardSchema, updateBoardSchema } = require("./board");
const { createColumnSchema, updateColumnSchema } = require("./column");
const { createCardSchema, updateCardSchema } = require("./card.js");

const { columnAndTaskSchema, taskToColumnSchema } = require("./dragAndDrop");

const { registerSchema, loginSchema } = require("./auth");
const { updateSchema } = require("./user");

const { themeSchema } = require("./theme");

const { helpRequestSchema } = require("./helpRequest");

module.exports = {
  createBoardSchema,
  updateBoardSchema,

  createColumnSchema,
  updateColumnSchema,

  createCardSchema,
  updateCardSchema,

  columnAndTaskSchema,
  taskToColumnSchema,

  themeSchema,

  helpRequestSchema,

  registerSchema,
  loginSchema,

  updateSchema,
};
