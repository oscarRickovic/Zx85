const fs = require("fs");
const path = require("path");

require('dotenv').config();  // Load the .env file

const STORAGE_ROOT = process.env.STORAGE_PATH; 

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
        const folderTree = getFolderTree(STORAGE_ROOT); // Get folder structure
        res.json(folderTree); // Return the folder structure in JSON format
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve folder structure" });
    }
};

module.exports = { getFolderStructure };
