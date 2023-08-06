const { HttpError } = require("../../helpers");
const { Card } = require("../../models");

const removeCard = async (req, res) => {
  const { id } = req.params;
  const result = await Card.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200);
  res.json({
    code: 200,
    message: "Task delete success",
  });
};

module.exports = removeCard;
