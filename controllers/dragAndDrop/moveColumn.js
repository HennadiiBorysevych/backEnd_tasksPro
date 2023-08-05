const { Column } = require("../../models/column");
const { HttpError } = require("../../helpers");

const moveColumn = async (req, res) => {
  const data = req.body;
  if (!data) {
    throw HttpError(400, "Not body");
  }

  for (const item of data) {
    await Column.updateOne(
      { _id: item.id },
      { $set: { orderColumn: item.order } }
    );
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Update position column ",
  });
};

module.exports = moveColumn;
