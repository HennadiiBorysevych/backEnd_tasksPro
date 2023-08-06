const { Column } = require("../../models");

const addColumn = async (req, res) => {
  const newColumn = await Column.create({ ...req.body });
  res.status(201);
  res.json({
    code: 201,
    message: "Success",
    result: newColumn,
  });
};

module.exports = addColumn;
