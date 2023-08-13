const { Column } = require("../../models/column");
const { HttpError } = require("../../helpers");

const moveColumn = async (req, res) => {
  const data = req.body;
  if (!data) {
    throw HttpError(400, "No body");
  }
  const dataNew = [];

  for (const item of data) {
    if (!item.id) {
      throw HttpError(400, "No column id");
    }

    const result = await Column.findByIdAndUpdate(
      { _id: item.id },
      { $set: { orderColumn: item.order } },
      { new: true }
    );

    if (!result) {
      throw HttpError(500, "Error moving column in database");
    }
    dataNew.push({ id: result.id, order: result.orderColumn });
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Success. Updated the column position",
    data: dataNew,
  });
};

module.exports = moveColumn;
