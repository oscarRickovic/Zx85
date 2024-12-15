const fs = require("fs");
const path = require("path");
const Statics = require("../Statics/Statics")

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


const deleteFileOrFolder = async (req, res) => {
    const { relativePath } = req.body; // Path from the request body
    
    if (!relativePath) {
        return res.status(400).json({ message: "Path is required." });
    }

    const sanitizedPath = relativePath.replace(/^\/+/, "");
    const fullPath = path.join(Statics.STORAGE_DIR, path.normalize(sanitizedPath));

    // Ensure the full path is within the storage directory to prevent directory traversal attacks
    if (!fullPath.startsWith(Statics.STORAGE_DIR)) {
        return res.status(400).json({ message: "Invalid path." });
    }

    try {
        if (fs.existsSync(fullPath)) {
            if (fs.statSync(fullPath).isDirectory()) {
                // If it's a directory, delete the folder and its contents
                fs.rmdirSync(fullPath, { recursive: true });
                return res.status(200).json({ message: "Folder deleted successfully." });
            } else {
                // If it's a file, delete the file
                fs.unlinkSync(fullPath);
                return res.status(200).json({ message: "File deleted successfully." });
            }
        } else {
            return res.status(404).json({ message: "Path not found." });
        }
    } catch (error) {
        console.error("Error deleting file/folder:", error);
        res.status(500).json({ message: "Error deleting the file/folder.", error: error.message });
    }
};

module.exports = { getFolderStructure, createFolder, deleteFileOrFolder};
