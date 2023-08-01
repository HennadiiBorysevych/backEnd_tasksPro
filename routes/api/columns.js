const express = require("express");
const router = express.Router();
const columnController = require("../../controllers");

router.get("/", columnController.getColumn);

router.post("/", columnController.addColumn);

router.patch("/:columnId", columnController.updateColumn);

router.delete("/:columnId", columnController.removeColumn);

module.exports = router;
