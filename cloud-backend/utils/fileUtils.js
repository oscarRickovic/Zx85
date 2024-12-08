const path = require('path');
require('dotenv').config();

const STORAGE_ROOT = process.env.STORAGE_PATH; 

// Function to resolve and sanitize file paths
const resolveFilePath = (relativePath) => {
    const resolvedPath = path.join(STORAGE_ROOT, relativePath);

    // Ensure the resolved path is within the root directory
    if (!resolvedPath.startsWith(STORAGE_ROOT)) {
        throw new Error('Invalid file path');
    }
    return resolvedPath;
};

module.exports = { resolveFilePath };
