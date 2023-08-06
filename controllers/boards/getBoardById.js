const { Board, Column, Card } = require("../../models");
const { HttpError } = require("../../helpers");

const getBoardById = async (req, res) => {
  const { id } = req.params;
  const board = await Board.findById(id, "-createdAt -updatedAt");

  if (!board) {
    throw HttpError(404, "Not found");
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

  res.status(200);
  res.json({
    code: 200,
    message: "Success",
    board,
    columns,
    cards,
  });
};

module.exports = getBoardById;
