const express = require("express");
const router = express.Router();
const fileController = require("../controllers/DownloadFileController");

router.get("/download", fileController.downloadFile);

module.exports = router;
