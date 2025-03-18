const express = require("express");
const router = express.Router();
const followController = require("../controllers/followController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Follow:
 *       type: object
 *       required:
 *         - follower_id
 *         - following_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique ID of the follow entry
 *         follower_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who is following
 *         following_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the user being followed
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         follower_id: "user-1"
 *         following_id: "user-2"
 */

/**
 * @swagger
 * tags:
 *   name: Follows
 *   description: Follow system API
 */

/**
 * @swagger
 * /follow:
 *   post:
 *     summary: Follow a user
 *     tags: [Follows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - follower_id
 *               - following_id
 *             properties:
 *               follower_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the user who is following
 *               following_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the user being followed
 *     responses:
 *       201:
 *         description: User followed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Follow'
 *       400:
 *         description: Bad request
 */
router.post("/follow", followController.followUser);

/**
 * @swagger
 * /unfollow:
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Follows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - follower_id
 *               - following_id
 *             properties:
 *               follower_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the user who is unfollowing
 *               following_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the user being unfollowed
 *     responses:
 *       200:
 *         description: User unfollowed successfully
 *       400:
 *         description: Bad request
 */
router.delete("/unfollow", followController.unfollowUser);

module.exports = router;
