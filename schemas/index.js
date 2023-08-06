const { createBoardSchema, updateBoardSchema } = require("./board");
const { createColumnSchema, updateColumnSchema } = require("./column");
const { createCardSchema, updateCardSchema } = require("./card.js");
const draAndDropSchema = require("./dragAndDrop");
const themeSchema = require("./theme");

module.exports = {
  createBoardSchema,
  updateBoardSchema,
  createColumnSchema,
  updateColumnSchema,
  createCardSchema,
  updateCardSchema,
  draAndDropSchema,
  themeSchema,
};
