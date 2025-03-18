const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       required:
 *         - user_id
 *         - journal_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique ID of the like entry
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who liked the journal
 *         journal_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the journal that was liked
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         user_id: "user-1"
 *         journal_id: "journal-1"
 */

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Like system API
 */

/**
 * @swagger
 * /likes:
 *   post:
 *     summary: Like a journal
 *     tags: [Likes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - journal_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the user who is liking the journal
 *               journal_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the journal being liked
 *     responses:
 *       201:
 *         description: Journal liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       400:
 *         description: Bad request
 */
router.post("/", likeController.likeJournal);

/**
 * @swagger
 * /likes/{id}:
 *   delete:
 *     summary: Unlike a journal
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the like entry to be removed
 *     responses:
 *       200:
 *         description: Journal unliked successfully
 *       400:
 *         description: Bad request
 */
router.delete("/:id", likeController.unlikeJournal);

module.exports = router;
