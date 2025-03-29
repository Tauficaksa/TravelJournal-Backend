const { User } = require("../models");
const { Op } = require("sequelize");

// Get all users (Retrieve Image as Base64)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create User (Handle Image Upload)
exports.createUser = async (req, res) => {
    try {
        console.log("Received file:", req.file);  // Debugging logs
        console.log("Received body:", req.body);

        const { name, email, pwd } = req.body;
        const profile_image = req.file ? `/uploads/${req.file.filename}` : null;

        if (!name || !email || !pwd) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "Email is already registered" });
        }

        // Create user with image
        const user = await User.create({ name, email, pwd, profile_image });
        res.status(201).json(user);
    } catch (error) {
        console.error("Error in createUser:", error);
        res.status(500).json({ error: error.message });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "User not found" });
        let imageUrl = user.image;
        if (req.file) {
            // Delete old image if it exists
            if (user.image) {
                const oldImagePath = path.join(__dirname, "..", journal.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            imageUrl = `/uploads/${req.file.filename}`;
        }

        await user.update({
            name,
            email,
            profile_image: imageUrl
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.image) {
            const imagePath = path.join(__dirname, "..", journal.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, pwd } = req.body
        const user = await User.findOne({ where: { email, pwd } })
        if (!user) {
            res.status(401).json({ error: "invalid email or password" })
        }
        else {
            res.status(200).json(user)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
