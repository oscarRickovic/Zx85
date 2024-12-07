const path = require("path");
const fs = require("fs");

// Path to your storage folder
const STORAGE_DIR = "/home/tay/Desktop/Zx85/Storage";

const downloadFile = (req, res) => {
    const { path: relativePath } = req.query;

    if (!relativePath) {
        return res.status(400).json({ message: "File path is required." });
    }

    // Resolve the full path to the file
    const fullPath = path.join(STORAGE_DIR, relativePath);

    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
        return res.status(404).json({ message: "File not found." });
    }

    // Send the file to the client
    res.download(fullPath, (err) => {
        if (err) {
            console.error("Error sending the file:", err);
            return res.status(500).json({ message: "Error downloading the file." });
        }
    });
};

module.exports = {
    downloadFile,
};
