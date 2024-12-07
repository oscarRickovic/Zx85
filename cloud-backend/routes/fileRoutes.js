const express = require("express");
const router = express.Router();
const fileController = require("../controllers/FileControllers");

// Define the download route
router.get("/download", fileController.downloadFile);

module.exports = router;
