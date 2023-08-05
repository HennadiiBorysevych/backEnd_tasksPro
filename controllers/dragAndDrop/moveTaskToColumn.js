const { Column } = require("../../models/column");
const { Card } = require("../../models/card");
const { HttpError } = require("../../helpers");

const moveTaskToColumn = async (req, res) => {
  const { idTask, idColumnNew, dataOld, dataNew } = req.body;
  if (!dataOld || !dataNew) {
    throw HttpError(400, "not dataOld or not dataNew");
  }
  if (!idTask || !idColumnNew) {
    throw HttpError(400, "not idTask or not idColumnNew");
  }
  const result = await Card.findByIdAndUpdate(
    idTask,
    { cardOwner: idColumnNew },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  for (const item of dataOld) {
    await Column.updateOne(
      { _id: item.id },
      { $set: { orderTask: item.order } }
    );
  }

  for (const item of dataNew) {
    await Column.updateOne(
      { _id: item.id },
      { $set: { orderTask: item.order } }
    );
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Update task to column ",
    data: result,
  });
};

module.exports = moveTaskToColumn;
