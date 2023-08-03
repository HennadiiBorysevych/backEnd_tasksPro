const { Card } = require("../../models/card");
const { HttpError } = require("../../helpers");

const moveTaskToColumn = async (req, res) => {
  const { columndId } = req.params;
  const data = req.body;

  if (!data) {
    throw HttpError(400, "Not body");
  }
  const result = await Card.find({ taskOwner: columndId });
  if (!result) {
    throw HttpError(404, "Not Found");
  }

  const changeColumn = result.map((column) => {
    const foundData = data.find((item) => column.id === item.id);
    if (foundData) {
      column.orderTask = foundData.order;
    }
    return column;
  });

  res.status(200);
  res.json({
    code: 200,
    message: "Update position column ",
    data: changeColumn,
  });
};

module.exports = moveTaskToColumn;
