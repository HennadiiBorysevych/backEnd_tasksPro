const { HttpError } = require("../../helpers");
const { Column } = require("../../models");

const getColumnById = async (req, res) => {
  const { id } = req.params;
  const column = await Column.findById(id, "-createdAt -updatedAt");
  if (!column) {
    throw HttpError(404, "Not found");
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Success",
    column,
  });
};

module.exports = getColumnById;
