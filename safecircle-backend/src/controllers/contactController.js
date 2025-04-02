const Contact = require("../models/Contact");
const User = require("../models/User");

// Get all trusted contacts

// Update a report option
const updateReportOption = async (req, res) => {
    try {
        console.log("🔍 Incoming request to update report option:", req.body); // Debugging log
        const { name, contacts, procedure } = req.body;
        const userId = req.user.id;

        console.log("🔍 User ID:", userId); // Debugging log

        const user = await User.findById(userId);
        if (!user) {
            console.log("⛔ User not found");
            return res.status(404).json({ message: "User not found" });
        }

        const optionIndex = user.reportOptions.findIndex((option) => option.name === name);
        if (optionIndex !== -1) {
            console.log("✅ Updating existing report option");
            user.reportOptions[optionIndex].contacts = contacts;
            user.reportOptions[optionIndex].procedure = procedure;
        } else {
            console.log("✅ Adding new report option");
            user.reportOptions.push({ name, contacts, procedure });
        }

        await user.save();
        res.status(200).json({ message: "Report option updated successfully", reportOptions: user.reportOptions });
    } catch (error) {
        console.error("⛔ Error updating report option:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all report options
const getReportOptions = async (req, res) => {
    try {
        console.log("🔍 Fetching report options for user ID:", req.user.id); // Debugging log
        const userId = req.user.id;

        const user = await User.findById(userId).select("reportOptions");
        if (!user) {
            console.log("⛔ User not found");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("✅ Fetched report options:", user.reportOptions); // Debugging log
        res.status(200).json(user.reportOptions);
    } catch (error) {
        console.error("⛔ Error fetching report options:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Ensure all functions are properly exported
module.exports = {
    updateReportOption,
    getReportOptions
};
