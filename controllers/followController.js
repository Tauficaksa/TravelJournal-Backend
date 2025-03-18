const Follow = require("../models/Follow");

exports.followUser = async (req, res) => {
    try {
        const { follower_id, following_id } = req.body;

        if (!follower_id || !following_id) {
            return res.status(400).json({ error: "Both follower_id and following_id are required" });
        }

        if (follower_id === following_id) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        }

        const follow = await Follow.create({ follower_id, following_id });
        res.status(201).json(follow);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.unfollowUser = async (req, res) => {
    try {
        const { follower_id, following_id } = req.body;

        if (!follower_id || !following_id) {
            return res.status(400).json({ error: "Both follower_id and following_id are required" });
        }

        const deleted = await Follow.destroy({ where: { follower_id, following_id } });

        if (deleted) {
            res.status(200).json({ message: "Unfollowed successfully" });
        } else {
            res.status(404).json({ error: "Follow relationship not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
