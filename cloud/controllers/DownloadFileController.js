const path = require("path");
const fs = require("fs");
const Statics = require ("../Statics/Statics")

const downloadFile = (req, res) => {
    const { path: relativePath } = req.query;

    console.log("Requested Relative Path:", relativePath);

    if (!relativePath) {
        return res.status(400).json({ message: "File path is required." });
    }

    // Remove leading slashes from the relative path
    const sanitizedPath = relativePath.replace(/^\/+/, "");

    const fullPath = path.join(Statics.STORAGE_DIR, path.normalize(sanitizedPath));

    console.log("Resolved Full Path:", fullPath);

    // Ensure the full path is within STORAGE_DIR to prevent directory traversal attacks
    if (!fullPath.startsWith(Statics.STORAGE_DIR)) {
        return res.status(400).json({ message: "Invalid file path." });
    }

    if (!fs.existsSync(fullPath)) {
        console.error("File not found:", fullPath);
        return res.status(404).json({ message: "File not found." });
    }

    // Send the file
    res.download(fullPath, (err) => {
        if (err) {
            console.error("Error sending the file:", err);
            res.status(500).json({ message: "Error downloading the file." });
        }
    });
};

module.exports = {
    downloadFile,
};
