const multer = require('multer');
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const uploadFunction = require("../controllers/UploadController")
const multerInstance = multer({ dest: 'uploads/' });
const router = express.Router();
const path = require('path'); // Add this line to import path module
// Set up file storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Set file destination directory
      cb(null, '/home/tay/Desktop/Zx85/Storage');
    },
    filename: (req, file, cb) => {
      // Set file name to be original with a timestamp
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  // Set up file upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Max file size of 10MB
    fileFilter: (req, file, cb) => {
      // Accept different types of files
      const allowedTypes = /pdf|jpeg|jpg|png|gif|txt|js|css|html|mp4|webm|avi/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
  
      if (extname && mimetype) {
        return cb(null, true);
      } else {
        return cb(new Error('Invalid file type. Only PDFs, images, videos, text, and JS files are allowed.'));
      }
    },
})

module.exports = upload