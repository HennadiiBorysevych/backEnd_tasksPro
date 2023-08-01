const express = require("express");
const router = express.Router();
const cardsController = require("../../controllers");

router.get("/:id", cardsController.getCard);
router.post("/:id", cardsController.addCard);
router.patch("/:id", cardsController.updateCard);
router.delete("/:id", cardsController.removeCard);

module.exports = router;
