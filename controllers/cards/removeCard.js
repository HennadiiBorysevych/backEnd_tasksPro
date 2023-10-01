const { HttpError } = require("../../helpers");
const { Card } = require("../../models");
const { cache } = require("../../cache");
const { getCachedBoard } = require("../../helpers");

const removeCard = async (req, res) => {
  const { id } = req.params;
  const result = await Card.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Card not found");
  }

  const substring = "Get board by ID";
  const cachedBoardKey = await getCachedBoard(substring, result);
  cache.del([cachedBoardKey, `Get card by ID:${id}`]);

  res.status(200);
  res.json({
    code: 200,
    message: "Card delete success",
    data: result,
  });
};

module.exports = removeCard;
