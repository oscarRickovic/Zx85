const multer = require('multer');
const path = require('path');
const { resolveFilePath } = require('../utils/fileUtils'); // Import the utility function

require('dotenv').config();

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const folderPath = req.body.folderPath; // Default to root
            console.log("request file:", req.body);
            const resolvedFolderPath = resolveFilePath(folderPath); // Resolve path
            console.log("RESOLVED PATH: ", resolvedFolderPath);

            cb(null, resolvedFolderPath);
        } catch (error) {
            cb(new Error('Invalid folder path'));
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Timestamp filenames
    },
});

// Configure multer upload instance
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max size
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|jpeg|jpg|png|gif|txt|js|css|html|mp4|webm|avi/;
        const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
                        allowedTypes.test(file.mimetype);

        if (isValid) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'));
        }
    },
});

module.exports = upload;
