const multer = require('multer');
const path = require('path');
const { resolveFilePath } = require('./fileUtils'); // Import the utility function

require('dotenv').config();

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const folderPath = req.body.folderPath || '/'; // Default to root if no folderPath is provided
            console.log("Request file:", req.body);
            const resolvedFolderPath = resolveFilePath(folderPath); // Resolve path
            console.log("Resolved path:", resolvedFolderPath);

            cb(null, resolvedFolderPath);
        } catch (error) {
            cb(new Error('Invalid folder path'));
        }
    },
    filename: (req, file, cb) => {
        // Use original filename and avoid overwriting by appending a timestamp if needed
        const extname = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extname);
        const uniqueName = `${basename}${extname}`; // Optional timestamp to avoid collisions
        cb(null, uniqueName); // Respect the original filename
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
