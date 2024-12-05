const express = require('express');
const authMiddleware = require('../middleware/authMiddleware')
const uploadFunction = require("../controllers/UploadController")
const router = express.Router();
const uploadMiddleWare = require("../middleware/MilterMiddleWare");

router.post('/upload', uploadMiddleWare.single('file'), uploadFunction);

module.exports = router;
