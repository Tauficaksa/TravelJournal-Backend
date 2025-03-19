const express = require("express");
const router = express.Router();
const journalController = require("../controllers/journalController");
const multer = require("multer");

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @swagger
 * components:
 *   schemas:
 *     TravelJournal:
 *       type: object
 *       required:
 *         - user_id
 *         - name
 *         - status
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique ID of the journal
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who owns the journal
 *         name:
 *           type: string
 *           description: The journal name
 *         description:
 *           type: string
 *           description: The journal description
 *         status:
 *           type: string
 *           enum: [private, public]
 *           description: The visibility status of the journal
 *         location:
 *           type: string
 *           description: The location of the journal
 *         image:
 *           type: string
 *           format: binary
 *           description: The journal's image file
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         user_id: "user-123"
 *         name: "Trip to Paris"
 *         description: "Amazing journey!"
 *         status: "public"
 *         location: "Paris"
 *         image: "data:image/png;base64,iVBORw0KGgoAAAANS..."
 */

/**
 * @swagger
 * tags:
 *   name: Travel Journals
 *   description: Travel Journal management API
 */

/**
 * @swagger
 * /api/journals/:
 *   get:
 *     summary: Retrieve all travel journals
 *     tags: [Travel Journals]
 *     responses:
 *       200:
 *         description: A list of travel journals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TravelJournal'
 */
router.get("/", journalController.getJournals);

/**
 * @swagger
 * /api/journals/:
 *   post:
 *     summary: Create a new travel journal
 *     tags: [Travel Journals]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [private, public]
 *               location:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Journal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TravelJournal'
 */
router.post("/", upload.single("image"), journalController.createJournal);

/**
 * @swagger
 * /api/journals/{id}:
 *   put:
 *     summary: Update an existing travel journal
 *     tags: [Travel Journals]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the journal to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [private, public]
 *               location:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Journal updated successfully
 *       404:
 *         description: Journal not found
 */
router.put("/:id", upload.single("image"), journalController.updateJournal);

/**
 * @swagger
 * /api/journals/{id}:
 *   delete:
 *     summary: Delete a travel journal
 *     tags: [Travel Journals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the journal to delete
 *     responses:
 *       200:
 *         description: Journal deleted successfully
 *       404:
 *         description: Journal not found
 */
router.delete("/:id", journalController.deleteJournal);

module.exports = router;
