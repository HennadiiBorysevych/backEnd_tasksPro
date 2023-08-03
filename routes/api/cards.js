const express = require("express");
const router = express.Router();
const cardsController = require("../../controllers/cards");

router.post("/:columnId", cardsController.addCard);
// router.get("/:id", cardsController.getCard);
// router.patch("/:id", cardsController.updateCard);
// router.delete("/:id", cardsController.removeCard);

module.exports = router;
