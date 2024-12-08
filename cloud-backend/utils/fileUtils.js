const path = require('path');
require('dotenv').config();
const Statics = require("../database/Statics")
// Function to resolve and sanitize file paths
const resolveFilePath = (relativePath) => {
    const resolvedPath = path.join(Statics.STORAGE_DIR, relativePath);

    // Ensure the resolved path is within the root directory
    if (!resolvedPath.startsWith(Statics.STORAGE_DIR)) {
        throw new Error('Invalid file path');
    }
    return resolvedPath;
};

module.exports = { resolveFilePath };
