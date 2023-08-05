const express = require("express");
const router = express.Router();
const draAndDropController = require("../../controllers/dragAndDrop");
const { validateBody, auth } = require("../../middlewares");
const { draAndDropSchema } = require("../../schemas");

router.put(
  "/moveColumn",
  auth,
  validateBody(draAndDropSchema.columnAndTaskSchema),
  draAndDropController.moveColumn
);

router.put(
  "/moveTask",
  auth,
  validateBody(draAndDropSchema.columnAndTaskSchema),
  draAndDropController.moveTask
);

router.put(
  "/moveTasktoColumn",
  auth,
  validateBody(draAndDropSchema.taskToColumnSchema),
  draAndDropController.moveTaskToColumn
);

module.exports = router;
