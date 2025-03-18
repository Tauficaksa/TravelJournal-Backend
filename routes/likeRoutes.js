const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Like system API
 */

router.post("/", likeController.likeJournal);
router.delete("/:id", likeController.unlikeJournal);

module.exports = router;
