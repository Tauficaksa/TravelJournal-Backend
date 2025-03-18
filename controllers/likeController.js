const Like = require("../models/Like");

exports.likeJournal = async (req, res) => {
    try {
        const { user_id, journal_id } = req.body;

        if (!user_id || !journal_id) {
            return res.status(400).json({ error: "user_id and journal_id are required" });
        }

        // Check if the like already exists
        const existingLike = await Like.findOne({ where: { user_id, journal_id } });
        if (existingLike) {
            return res.status(400).json({ error: "You already liked this journal" });
        }

        // Create a new like
        const like = await Like.create({ user_id, journal_id });
        res.status(201).json({ message: "Journal liked successfully", like });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.unlikeJournal = async (req, res) => {
    try {
        const { user_id, journal_id } = req.body;

        if (!user_id || !journal_id) {
            return res.status(400).json({ error: "user_id and journal_id are required" });
        }

        // Check if the like exists before deleting
        const like = await Like.findOne({ where: { user_id, journal_id } });
        if (!like) {
            return res.status(404).json({ error: "Like not found" });
        }

        await Like.destroy({ where: { user_id, journal_id } });
        res.status(200).json({ message: "Like removed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
