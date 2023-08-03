const express = require("express");
const router = express.Router();
const boardsController = require("../../controllers/boards");
const { auth } = require("../../middlewares");

router.get("/", auth, boardsController.getBoard);
// router.get("/:boardId",auth, boardsController.getBoardById);
router.post("/", auth, boardsController.addBoard);
// router.patch("/:boardId", auth, boardsController.updateBoard);
// router.delete("/:boardId", auth, boardsController.removeBoard);

module.exports = router;
