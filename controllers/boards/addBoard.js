const { Board } = require("../../models");
const { cache } = require("../../cache");

const addBoard = async (req, res) => {
  const { _id: user } = req.user;
  const newBoard = await Board.create({ ...req.body, user });

  cache.del("Get All Boards");

  res.status(201);
  res.json({
    code: 201,
    message: "Add board success",
    data: newBoard,
  });
};

module.exports = addBoard;
