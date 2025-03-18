const express = require("express");
const router = express.Router();
const journalController = require("../controllers/journalController");

/**
 * @swagger
 * tags:
 *   name: Travel Journals
 *   description: Travel Journal management API
 */

router.get("/", journalController.getJournals);
router.post("/", journalController.createJournal);
router.put("/:id", journalController.updateJournal);
router.delete("/:id", journalController.deleteJournal);

module.exports = router;
