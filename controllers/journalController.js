const TravelJournal = require("../models/TravelJournal");

exports.createJournal = async (req, res) => {
    try {
        const { user_id, name, description, status, location, image } = req.body;

        if (!user_id || !name || !description || !status) {
            return res.status(400).json({ error: "user_id, name, description, and status are required" });
        }

        const journal = await TravelJournal.create({ user_id, name, description, status, location, image });
        res.status(201).json(journal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getJournals = async (req, res) => {
    try {
        const journals = await TravelJournal.findAll();
        res.status(200).json(journals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateJournal = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await TravelJournal.update(req.body, { where: { id } });

        if (updated) {
            const updatedJournal = await TravelJournal.findByPk(id);
            return res.status(200).json({ message: "Journal updated successfully", journal: updatedJournal });
        }

        return res.status(404).json({ error: "Journal not found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
