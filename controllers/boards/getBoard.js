const { Board } = require("../../models");

const getBoard = async (req, res) => {
  const { _id: user } = req.user;
  const result = await Board.find({ user }, "-createdAt -updatedAt");
  res.status(200);
  res.json({
    code: 200,
    message: "Success",
    result,
  });
};

module.exports = getBoard;
