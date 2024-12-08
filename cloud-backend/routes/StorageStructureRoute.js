const express = require("express");
const router = express.Router();
const { getFolderStructure, createFolder } = require("../controllers/StorageStructureController");

// Define the endpoint for getting folder structure
router.get("/structure", getFolderStructure);

router.post("/createFolder", createFolder);

module.exports = router;
