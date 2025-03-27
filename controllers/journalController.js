const TravelJournal = require("../models/TravelJournal");
const path = require("path");
const fs = require("fs");

// Create a Travel Journal
exports.createJournal = async (req, res) => {
    try {
        const { user_id, name, description, location } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!user_id || !name || !description) {
            return res.status(400).json({ error: "user_id, name, description are required" });
        }

        const journal = await TravelJournal.create({ user_id, name, description, location, image });
        res.status(201).json(journal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Journals
exports.getJournals = async (req, res) => {
    try {
        const journals = await TravelJournal.findAll();
        res.status(200).json(journals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Journal
exports.updateJournal = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, name, description, location } = req.body;
        const journal = await TravelJournal.findByPk(id);
        if (!journal) return res.status(404).json({ error: "Journal not found" });

        let imageUrl = journal.image;
        if (req.file) {
            // Delete old image if it exists
            if (journal.image) {
                const oldImagePath = path.join(__dirname, "..", journal.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            imageUrl = `/uploads/${req.file.filename}`;
        }

        await journal.update({
            user_id,
            name,
            description,
            location,
            image: imageUrl
        });

        res.status(200).json({ message: "Journal updated successfully", journal });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Journal
exports.deleteJournal = async (req, res) => {
    try {
        const { id } = req.params;
        const journal = await TravelJournal.findByPk(id);

        if (!journal) return res.status(404).json({ error: "Journal not found" });

        // Delete associated image
        if (journal.image) {
            const imagePath = path.join(__dirname, "..", journal.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await journal.destroy();
        res.status(200).json({ message: "Journal deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
