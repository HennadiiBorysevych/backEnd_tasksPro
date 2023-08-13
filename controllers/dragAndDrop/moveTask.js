const { Card } = require("../../models/card");
const { HttpError } = require("../../helpers");

const moveTask = async (req, res) => {
  const data = req.body;

  if (!data) {
    throw HttpError(400, "Not body");
  }
  const dataNew = [];

  for (const item of data) {
    if (!item.id) {
      throw HttpError(400, "No task id");
    }

    const result = await Card.findByIdAndUpdate(
      { _id: item.id },
      { $set: { orderTask: item.order } },
      { new: true }
    );

    if (!result) {
      throw HttpError(500, "Error moving task in database");
    }

    dataNew.push({ id: result.id, order: result.orderTask });
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Success. Updated the task position",
    data: dataNew,
  });
};

module.exports = moveTask;
