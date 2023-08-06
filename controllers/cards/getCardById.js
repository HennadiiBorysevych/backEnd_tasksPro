const { HttpError } = require("../../helpers");
const { Card } = require("../../models");

const getCardById = async (req, res) => {
  const { id } = req.params;
  const card = await Card.findById(id, "-createdAt -updatedAt");
  if (!card) {
    throw HttpError(404, "Not found");
  }

  res.status(200);
  res.json({
    code: 200,
    message: "Success",
    card,
  });
};

module.exports = getCardById;
