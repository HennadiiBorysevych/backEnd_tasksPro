const { Column } = require("../../models");
const { HttpError } = require("../../helpers");

const removeColumn = async (req, res) => {
  const { id } = req.params;
  const result = await Column.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Column not found");
  }
  res.status(200);
  res.json({
    code: 200,
    message: "Column delete success",
    data: result,
  });
};

module.exports = removeColumn;
