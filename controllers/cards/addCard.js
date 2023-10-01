const { Card } = require("../../models");
const { cache } = require("../../cache");
const { getCachedBoard } = require("../../helpers");

const addCard = async (req, res) => {
  const newCard = await Card.create({ ...req.body });

  const substring = "Get board by ID";
  const cachedBoardKey = await getCachedBoard(substring, newCard);

  cache.del(cachedBoardKey);

  res.status(201);
  res.json({
    code: 201,
    message: "Add card success",
    data: newCard,
  });
};

module.exports = addCard;
