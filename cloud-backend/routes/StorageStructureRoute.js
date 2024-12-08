const express = require("express");
const router = express.Router();
const { getFolderStructure, createFolder , deleteFileOrFolder} = require("../controllers/StorageStructureController");

// Define the endpoint for getting folder structure
router.get("/structure", getFolderStructure);

router.post("/createFolder", createFolder);

router.post("/delete", deleteFileOrFolder);

module.exports = router;
