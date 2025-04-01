const Contact = require("../models/Contact");
const User = require("../models/User");

// Get all trusted contacts

// Update a report option
const updateReportOption = async (req, res) => {
    try {
        const { name, contacts, procedure } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const optionIndex = user.reportOptions.findIndex((option) => option.name === name);
        if (optionIndex !== -1) {
            // Update existing option
            user.reportOptions[optionIndex].contacts = contacts;
            user.reportOptions[optionIndex].procedure = procedure;
        } else {
            // Add new option
            user.reportOptions.push({ name, contacts, procedure });
        }

        await user.save();
        res.status(200).json({ message: "Report option updated successfully", reportOptions: user.reportOptions });
    } catch (error) {
        console.error("Error updating report option:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all report options
const getReportOptions = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select("reportOptions");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user.reportOptions);
    } catch (error) {
        console.error("Error fetching report options:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Ensure all functions are properly exported
module.exports = {
    updateReportOption,
    getReportOptions
};
