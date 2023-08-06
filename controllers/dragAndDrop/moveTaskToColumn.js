const { Column } = require("../../models/column");
const { Card } = require("../../models/card");
const { HttpError } = require("../../helpers");

const moveTaskToColumn = async (req, res) => {
  const { idTask, idColumnNew, dataOld, dataNew } = req.body;

  if (!idTask || !idColumnNew) {
    throw HttpError(400, "not idTask or not idColumnNew");
  }

  if (!dataOld || !dataNew) {
    throw HttpError(400, "not dataOld or not dataNew");
  }

  const task = await Card.findOne({ _id: idTask });

  if (!task) {
    throw HttpError(404, "task not found");
  }

  const column = await Column.findOne({ _id: idColumnNew });

  if (!column) {
    throw HttpError(404, "column not found");
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
    const res = await Card.updateOne(
      { _id: item.id },
      { $set: { orderTask: item.order } }
    );
    if (!res) {
      throw HttpError(500, "error move task");
    }
  }

  for (const item of dataNew) {
    const res = await Card.updateOne(
      { _id: item.id },
      { $set: { orderTask: item.order } }
    );
    if (!res) {
      throw HttpError(500, "error move task");
    }
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Update task to column ",
    data: result,
  });
};

module.exports = moveTaskToColumn;
