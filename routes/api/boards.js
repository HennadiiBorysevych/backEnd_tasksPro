const express = require("express");
const router = express.Router();
const boardsController = require("../../controllers");

router.get("/", boardsController.getBoard);
router.get("/:boardId", boardsController.getBoardById);
router.post("/");
router.patch("/:boardId", boardsController.updateBoard);
router.delete("/:boardId", boardsController.removeBoard);

module.exports = router;
