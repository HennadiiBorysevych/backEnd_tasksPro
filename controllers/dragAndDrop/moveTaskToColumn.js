const { Column } = require("../../models/column");
const { Card } = require("../../models/card");
const { HttpError } = require("../../helpers");

const moveTaskToColumn = async (req, res) => {
  const { idTask, idColumnNew, dataOld, dataNew } = req.body;

  if (!idTask || !idColumnNew) {
    throw HttpError(400, "Not idTask or not idColumnNew");
  }

  if (!dataOld || !dataNew) {
    throw HttpError(400, "Not dataOld or not dataNew");
  }

  const task = await Card.findOne({ _id: idTask });

  if (!task) {
    throw HttpError(404, "Task not found");
  }

  const column = await Column.findOne({ _id: idColumnNew });

  if (!column) {
    throw HttpError(404, "Сolumn not found");
  }

  const result = await Card.findByIdAndUpdate(
    idTask,
    { cardOwner: idColumnNew },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  const responseTask = [];

  for (const item of dataOld) {
    if (!item.id) {
      throw HttpError(400, "The task ID is not in dataold");
    }

    const res = await Card.findByIdAndUpdate(
      { _id: item.id },
      { $set: { orderTask: item.order } },
      { new: true }
    );

    if (!res) {
      throw HttpError(500, "error move task");
    }

    responseTask.push(res);
  }

  for (const item of dataNew) {
    if (!item.id) {
      throw HttpError(400, "The task ID is not in dataNew");
    }

    const res = await Card.findByIdAndUpdate(
      { _id: item.id },
      { $set: { orderTask: item.order } },
      { new: true }
    );

    if (!res) {
      throw HttpError(500, "Error moving in the database");
    }

    responseTask.push(res);
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Success. Moved the task to the column",
    data: responseTask,
  });
};

module.exports = moveTaskToColumn;
