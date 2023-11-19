const { Board } = require("../../models");
const { cache } = require("../../cache");

const getBoard = async (req, res) => {
  const { _id: user } = req.user;

  const cacheData = await cache.get(`Get All Boards ${user}`);
  if (cacheData) {
    res.status(200);
    res.json({
      code: 200,
      message: "Get boards success",
      data: cacheData,
    });
    return;
  }

  const result = await Board.find({ user }, "-createdAt -updatedAt");

  cache.set(`Get All Boards ${user}`, result);

  res.status(200);
  res.json({
    code: 200,
    message: "Get boards success",
    data: result,
  });
};

module.exports = getBoard;
