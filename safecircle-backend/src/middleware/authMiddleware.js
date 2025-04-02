const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("🔍 Auth Header:", authHeader); // Debugging log

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("⛔ No token provided");
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        const token = authHeader.split(" ")[1];
        console.log("🔑 Extracted Token:", token); // Debugging log

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded); // Debugging log

        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            console.log("⛔ User not found in database");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("✅ User authenticated:", req.user);
        next();
    } catch (error) {
        console.error("⛔ Auth Error:", error);
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = { authMiddleware }; // ✅ Ensure export matches import
