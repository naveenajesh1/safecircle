const express = require("express");
const { addContact, getContacts, updateContact, deleteContact } = require("../controllers/contactController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();



router.post("/add", authMiddleware, addContact); // Add contact
router.get("/", authMiddleware, getContacts); // Get contacts
router.put("/:id", authMiddleware, updateContact); // Update contact
router.delete("/:id", authMiddleware, deleteContact); // Delete contact

module.exports = router;
