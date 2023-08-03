const express = require("express");
const router = express.Router();
const columnController = require("../../controllers/columns");

// router.get("/", columnController.getColumn);

router.post("/:boardId", columnController.addColumn);

// router.patch("/:columnId", columnController.updateColumn);

// router.delete("/:columnId", columnController.removeColumn);

module.exports = router;
