const { Board } = require("../../models");
const { HttpError } = require("../../helpers");
const { cache } = require("../../cache");

const removeBoard = async (req, res) => {
  const { _id: user } = req.user;
  const { id } = req.params;
  const result = await Board.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Board not found");
  }

  cache.del([`Get All Boards ${user}`, `Get board by ID:${id}`]);

  res.status(200);
  res.json({
    code: 200,
    message: "Board delete success",
    data: result,
  });
};

module.exports = removeBoard;
