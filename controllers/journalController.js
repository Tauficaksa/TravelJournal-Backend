const TravelJournal = require("../models/TravelJournal");

// Create a Travel Journal
exports.createJournal = async (req, res) => {
    try {
        const { user_id, name, description, status, location } = req.body;
        const image = req.file ? req.file.buffer : null; // Store as Buffer

        if (!user_id || !name || !description || !status) {
            return res.status(400).json({ error: "user_id, name, description, and status are required" });
        }

        const journal = await TravelJournal.create({ user_id, name, description, status, location, image });
        res.status(201).json(journal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Journals (Convert image to Base64)
exports.getJournals = async (req, res) => {
    try {
        const journals = await TravelJournal.findAll();
        
        // Convert images to Base64 for response
        const formattedJournals = journals.map(journal => ({
            ...journal.toJSON(),
            image: journal.image ? `data:image/png;base64,${journal.image.toString("base64")}` : null
        }));

        res.status(200).json(formattedJournals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Journal
exports.updateJournal = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, name, description, status, location } = req.body;
        const image = req.file ? req.file.buffer : undefined; // Only update if new file is uploaded

        const journal = await TravelJournal.findByPk(id);
        if (!journal) return res.status(404).json({ error: "Journal not found" });

        await journal.update({ 
            user_id, 
            name, 
            description, 
            status, 
            location, 
            ...(image !== undefined && { image }) // Update only if a new image is provided
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
        const deleted = await TravelJournal.destroy({ where: { id } });

        if (deleted) {
            return res.status(200).json({ message: "Journal deleted successfully" });
        }

        return res.status(404).json({ error: "Journal not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
