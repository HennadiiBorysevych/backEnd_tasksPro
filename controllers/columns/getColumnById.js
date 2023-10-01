const { HttpError } = require("../../helpers");
const { Column } = require("../../models");
const { cache } = require("../../cache");

const getColumnById = async (req, res) => {
  const { id } = req.params;

  const cacheData = await cache.get(`Get column by ID:${id}`);
  if (cacheData) {
    res.status(200);
    res.json({
      code: 200,
      message: "Get column by ID success",
      data: cacheData,
    });
    return;
  }

  const column = await Column.findById(id, "-createdAt -updatedAt");
  if (!column) {
    throw HttpError(404, "Column not found");
  }

  cache.set(`Get column by ID:${id}`, column);

  res.status(200);
  res.json({
    code: 200,
    message: "Get column by ID success",
    data: column,
  });
};

module.exports = getColumnById;
