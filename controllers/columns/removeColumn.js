const { Column } = require("../../models");
const { HttpError } = require("../../helpers");
const { cache } = require("../../cache");

const removeColumn = async (req, res) => {
  const { id } = req.params;
  const result = await Column.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Column not found");
  }

  cache.del([
    `Get board by ID:${result.columnOwner}`,
    `Get column by ID:${id}`,
  ]);

  res.status(200);
  res.json({
    code: 200,
    message: "Column delete success",
    data: result,
  });
};

module.exports = removeColumn;
