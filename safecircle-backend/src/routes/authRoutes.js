const express = require("express");
const { registerUser, loginUser, getUserProfile,updateUserProfile } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware"); // ✅ 

const router = express.Router();

// Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile); // ✅ Update profile

module.exports = router;
