const { Board } = require("../../models/board");

const addBoard = async (req, res) => {
  const { _id: user } = req.user;

  const result = await Board.create({ ...req.body, user });

  res.status(201);
  res.json({
    code: 201,
    message: "Success",
    data: result,
  });
};

module.exports = addBoard;
