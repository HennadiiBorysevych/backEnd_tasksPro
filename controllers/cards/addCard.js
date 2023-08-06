const { Card } = require("../../models");

const addCard = async (req, res) => {
  const newCard = await Card.create({ ...req.body });
  res.status(201);
  res.json({
    code: 201,
    message: "Success",
    result: newCard,
  });
};

module.exports = addCard;
