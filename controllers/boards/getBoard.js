const { Board } = require("../../models/board");

const getBoard = async (req, res) => {
  const { _id: user } = req.user;

  const result = await Board.find({ user }, "-createdAt -updatedAt").populate(
    "user",
    "name email theme avatarUrl "
  );
  const qty = result.length;

  res.status(200);
  res.json({
    code: 200,
    message: "Success",
    data: result,
    qty,
  });
};
module.exports = getBoard;
