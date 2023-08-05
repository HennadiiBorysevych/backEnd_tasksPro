const { Column } = require("../../models");
const { HttpError } = require("../../helpers");

const updateColumn = async (req, res) => {
  const { id } = req.params;
  const result = await Column.findByIdAndUpdate(id, req.body, {
    new: true,
  }).select({ createdAt: 0, updatedAt: 0 });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(201);
  res.json({
    code: 201,
    result,
  });
};

module.exports = updateColumn;
