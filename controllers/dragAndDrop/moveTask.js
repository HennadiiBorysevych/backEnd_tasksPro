const { Card } = require("../../models/card");
const { HttpError } = require("../../helpers");

const moveTask = async (req, res) => {
  const data = req.body;

  if (!data) {
    throw HttpError(400, "Not body");
  }
  const dataNew = [];

  for (const item of data) {
    const result = await Card.findByIdAndUpdate(
      { _id: item.id },
      { $set: { orderTask: item.order } },
      { new: true }
    );

    dataNew.push({ id: result.id, order: result.orderTask });

    if (!result) {
      throw HttpError(500, "error move task");
    }
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Update position task ",
    data: dataNew,
  });
};

module.exports = moveTask;
