const { createBoardSchema, updateBoardSchema } = require("./board");
const { createColumnSchema, updateColumnSchema } = require("./column");
const { createCardSchema, updateCardSchema } = require("./card.js");
const draAndDropSchema = require("./dragAndDrop");

module.exports = {
  createBoardSchema,
  updateBoardSchema,
  createColumnSchema,
  updateColumnSchema,
  createCardSchema,
  updateCardSchema,
  draAndDropSchema,
};
