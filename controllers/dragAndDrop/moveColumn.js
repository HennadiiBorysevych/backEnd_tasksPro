const { Column } = require("../../models/column");
const { HttpError } = require("../../helpers");

const moveColumn = async (req, res) => {
  const data = req.body;
  if (!data) {
    throw HttpError(400, "Not body");
  }
  const dataNew = [];

  for (const item of data) {
    const result = await Column.findByIdAndUpdate(
      { _id: item.id },
      { $set: { orderColumn: item.order } },
      { new: true }
    );

    dataNew.push({ id: result.id, order: result.orderColumn });

    if (!result) {
      throw HttpError(500, "error move column");
    }
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Update position column ",
    data: dataNew,
  });
};

module.exports = moveColumn;
