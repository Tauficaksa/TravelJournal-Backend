const express = require("express");
const router = express.Router();
const followController = require("../controllers/followController");

/**
 * @swagger
 * tags:
 *   name: Follows
 *   description: Follow system API
 */

router.post("/follow", followController.followUser);
router.delete("/unfollow", followController.unfollowUser);

module.exports = router;
