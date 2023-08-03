const { Card } = require("../../models/card");

const addCard = async (req, res) => {
  const { columnId } = req.params;

  const result = await Card.create({ ...req.body, cardOwner: columnId });

  res.status(201);
  res.json({
    code: 201,
    message: "Success",
    data: result,
  });
};

module.exports = addCard;
