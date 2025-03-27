const multer = require("multer");
const path = require("path");

// Configure storage to save files in the "uploads" directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Save images in the "uploads" folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});

const upload = multer({ storage });

module.exports = upload;
