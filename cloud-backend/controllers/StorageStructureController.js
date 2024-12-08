const fs = require("fs");
const path = require("path");
const Statics = require("../database/Statics")

require('dotenv').config();  // Load the .env file



// Function to recursively get folder structure
const getFolderTree = (directoryPath) => {
    const stats = fs.statSync(directoryPath);
    if (stats.isFile()) {
        return {
            name: path.basename(directoryPath),
            type: "file",
        };
    } else if (stats.isDirectory()) {
        return {
            name: path.basename(directoryPath),
            type: "folder",
            children: fs.readdirSync(directoryPath).map((child) =>
                getFolderTree(path.join(directoryPath, child))
            ),
        };
    }
};

// Controller to get the folder structure
const getFolderStructure = (req, res) => {
    try {
        const folderTree = getFolderTree(Statics.STORAGE_DIR); // Get folder structure
        res.json(folderTree); // Return the folder structure in JSON format
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve folder structure" });
    }
};


const createFolder = async (req, res) => {

    const { folderPath } = req.body;

    if (!folderPath) {
        return res.status(400).json({ message: "Folder path is required." });
    }

    const sanitizedPath = folderPath.replace(/^\/+/, "");
    const fullPath = path.join(Statics.STORAGE_DIR, path.normalize(sanitizedPath));

    if (!fullPath.startsWith(Statics.STORAGE_DIR)) {
        return res.status(400).json({ message: "Invalid folder path." });
    }

    try {
        if (fs.existsSync(fullPath)) {
            return res.status(400).json({ message: "Folder already exists." });
        }

        fs.mkdirSync(fullPath, { recursive: true });
        res.status(201).json({ message: "Folder created successfully.", path: sanitizedPath });
    } catch (error) {
        res.status(500).json({ message: "Error creating folder.", error: error.message });
    }
};

module.exports = { getFolderStructure, createFolder };
