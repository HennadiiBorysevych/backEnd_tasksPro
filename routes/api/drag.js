const express = require("express");
const router = express.Router();
const dragController = require("../../controllers/dragAndDrop");

router.put("/chageColumn/:boardId", dragController.moveColumn);

module.exports = router;
