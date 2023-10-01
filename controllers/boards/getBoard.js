const { Board } = require("../../models");
const { cache } = require("../../cache");

const getBoard = async (req, res) => {
  const cacheData = await cache.get("Get All Boards");
  if (cacheData) {
    res.status(200);
    res.json({
      code: 200,
      message: "Get boards success",
      data: cacheData,
    });
    return;
  }

  const { _id: user } = req.user;
  const result = await Board.find({ user }, "-createdAt -updatedAt");

  cache.set("Get All Boards", result);

  res.status(200);
  res.json({
    code: 200,
    message: "Get boards success",
    data: result,
  });
};

module.exports = getBoard;
