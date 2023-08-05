const express = require("express");
const router = express.Router();
const dragController = require("../../controllers/dragAndDrop");

router.put("/moveColumn", dragController.moveColumn);
router.put("/moveTask", dragController.moveTask);
router.put("/moveTasktoColumn", dragController.moveTaskToColumn);

module.exports = router;
