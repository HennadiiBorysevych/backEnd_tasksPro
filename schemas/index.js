const { createBoardSchema, updateBoardSchema } = require("./board");
const { createColumnSchema, updateColumnSchema } = require("./column");
const { createCardSchema, updateCardSchema } = require("./card.js");

module.exports = {
  createBoardSchema,
  updateBoardSchema,
  createColumnSchema,
  updateColumnSchema,
  createCardSchema,
  updateCardSchema,
};
