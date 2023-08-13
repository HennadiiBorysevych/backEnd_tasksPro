const { HttpError } = require("../../helpers");
const { Card } = require("../../models");

const updateCard = async (req, res) => {
  const { id } = req.params;
  const result = await Card.findByIdAndUpdate(id, req.body, {
    new: true,
  }).select({ createdAt: 0, updatedAt: 0 });

  if (!result) {
    throw HttpError(404, "Card not found");
  }

  res.status(201);
  res.json({
    code: 201,
    message: "Card update success",
    data: result,
  });
};

module.exports = updateCard;
