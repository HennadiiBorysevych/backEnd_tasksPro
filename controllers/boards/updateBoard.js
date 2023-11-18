const { HttpError } = require("../../helpers");
const { Board } = require("../../models");
const { cache } = require("../../cache");

const updateBoard = async (req, res) => {
  const { _id: user } = req.user;
  const { id } = req.params;
  const result = await Board.findByIdAndUpdate(id, req.body, {
    new: true,
  }).select({ createdAt: 0, updatedAt: 0 });

  if (!result) {
    throw HttpError(404, "Board not found");
  }

  cache.del([`Get All Boards ${user}`, `Get board by ID:${id}`]);

  res.status(201);
  res.json({
    code: 201,
    message: "Board update success",
    data: result,
  });
};

module.exports = updateBoard;
