const express = require("express");
const { addContact, getContacts, updateContact, deleteContact, updateReportOption, getReportOptions } = require("../controllers/contactController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();



router.put("/report-options", authMiddleware, updateReportOption); // Update report options
router.get("/report-options", authMiddleware, getReportOptions); // Get report options

module.exports = router;
