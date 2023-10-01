const { HttpError } = require("../../helpers");
const { Card } = require("../../models");
const { cache } = require("../../cache");
const { getCachedBoard } = require("../../helpers");

const updateCard = async (req, res) => {
  const { id } = req.params;

  const result = await Card.findByIdAndUpdate(id, req.body, {
    new: true,
  }).select({ createdAt: 0, updatedAt: 0 });

  if (!result) {
    throw HttpError(404, "Card not found");
  }

  const substring = "Get board by ID";
  const cachedBoardKey = await getCachedBoard(substring, result);
  cache.del([cachedBoardKey, `Get card by ID:${id}`]);

  res.status(201);
  res.json({
    code: 201,
    message: "Card update success",
    data: result,
  });
};

module.exports = updateCard;
