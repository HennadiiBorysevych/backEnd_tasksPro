const { Column } = require("../../models/column");

const addColumn = async (req, res) => {
  const { boardId } = req.params;

  const result = await Column.create({ ...req.body, columnOwner: boardId });

  res.status(201);
  res.json({
    code: 201,
    message: "Success",
    data: result,
  });
};

module.exports = addColumn;
