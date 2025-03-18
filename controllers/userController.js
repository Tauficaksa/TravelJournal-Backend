const { User } = require("../models");
const { Op } = require("sequelize");

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a user
exports.createUser = async (req, res) => {
    try {
        const { name, email, pwd, profile_image, firebase_uid } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "Email is already registered" });
        }

        const password = firebase_uid ? "firebase" : pwd;
        const firebaseId = pwd ? "pwd" : firebase_uid;

        const user = await User.create({ name, email, pwd: password, profile_image, firebase_uid: firebaseId });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, profile_image } = req.body;

        // Validate UUID format (Optional but recommended)
        if (!id.match(/^[0-9a-fA-F-]{36}$/)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        await user.update({ name, email, profile_image });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F-]{36}$/)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
