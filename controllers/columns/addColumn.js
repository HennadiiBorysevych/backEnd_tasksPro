const { Column } = require("../../models");
const { cache } = require("../../cache");

const addColumn = async (req, res) => {
  const newColumn = await Column.create({ ...req.body });

  cache.del(`Get board by ID:${newColumn.columnOwner}`);

  res.status(201);
  res.json({
    code: 201,
    message: "Add column success",
    data: newColumn,
  });
};

module.exports = addColumn;
