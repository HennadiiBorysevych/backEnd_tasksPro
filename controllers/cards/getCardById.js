const { HttpError } = require("../../helpers");
const { Card } = require("../../models");
const { cache } = require("../../cache");

const getCardById = async (req, res) => {
  const { id } = req.params;

  const cacheData = await cache.get(`Get card by ID:${id}`);
  if (cacheData) {
    res.status(200);
    res.json({
      code: 200,
      message: "Get card by ID success",
      data: cacheData,
    });
    return;
  }

  const card = await Card.findById(id, "-createdAt -updatedAt");
  if (!card) {
    throw HttpError(404, "Card not found");
  }

  cache.set(`Get card by ID:${id}`, card);

  res.status(200);
  res.json({
    code: 200,
    message: "Get card by ID success",
    data: card,
  });
};

module.exports = getCardById;
