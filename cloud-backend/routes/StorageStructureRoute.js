const express = require("express");
const router = express.Router();
const { getFolderStructure } = require("../controllers/StorageStructureController");

// Define the endpoint for getting folder structure
router.get("/structure", getFolderStructure);

module.exports = router;
