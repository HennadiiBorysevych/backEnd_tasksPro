const { Board } = require("../../models");

const addBoard = async (req, res) => {
  const { _id: user } = req.user;
  const newBoard = await Board.create({ ...req.body, user });
  res.status(201);
  res.json({
    code: 201,
    message: "Success",
    result: newBoard,
  });
};

module.exports = addBoard;
