const { Board } = require("../../models");
const { HttpError } = require("../../helpers");

const removeBoard = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Board not found");
  }
  res.status(200);
  res.json({
    code: 200,
    message: "Board delete success",
    data: result,
  });
};

module.exports = removeBoard;
