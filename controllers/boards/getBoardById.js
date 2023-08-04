const { Board } = require("../../models");
const { HttpError } = require("../../helpers");

const getBoardById = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findById(id, "-createdAt -updatedAt");
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200);
  res.json({
    code: 200,
    message: "Success",
    result,
  });
};

module.exports = getBoardById;
