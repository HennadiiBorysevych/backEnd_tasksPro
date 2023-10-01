const { Board, Column, Card } = require("../../models");
const { HttpError } = require("../../helpers");
const { cache } = require("../../cache");

const getBoardById = async (req, res) => {
  const { id } = req.params;
  const cacheData = await cache.get(`Get board by ID:${id}`);
  if (cacheData) {
    const { board, columns, cards } = cacheData;
    res.status(200);
    res.json({
      code: 200,
      message: "Get boards success",
      board,
      columns,
      cards,
    });
    return;
  }

  const board = await Board.findById(id, "-createdAt -updatedAt");
  if (!board) {
    throw HttpError(404, "Board not found");
  }
  const columns = await Column.find(
    { columnOwner: id },
    "-createdAt -updatedAt"
  );
  async function findCards(array) {
    const nestedArrsOfCards = [];
    for await (const column of array) {
      nestedArrsOfCards.push(
        await Card.find({ cardOwner: column._id }, "-createdAt -updatedAt")
      );
    }
    const result = nestedArrsOfCards.flatMap((arr) => arr);
    return result;
  }
  const cards = await findCards(columns);

  cache.set(`Get board by ID:${id}`, { board, columns, cards });

  res.status(200);
  res.json({
    code: 200,
    message: "Get board by ID success",
    board,
    columns,
    cards,
  });
};

module.exports = getBoardById;
