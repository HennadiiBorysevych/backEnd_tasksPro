const { Card } = require("../../models/card");
const { HttpError } = require("../../helpers");

const moveTask = async (req, res) => {
  const data = req.body;

  if (!data) {
    throw HttpError(400, "Not body");
  }

  for (const item of data) {
    await Card.updateOne({ _id: item.id }, { $set: { orderTask: item.order } });
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Update position task ",
  });
};

module.exports = moveTask;
