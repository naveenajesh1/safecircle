const axios = require("axios");
const { sendEmergencyMessage } = require("../utils/whatsapp");
const { startMediaRecording } = require("../controllers/mediaController");

exports.handlePowerButtonPress = async (req, res) => {
    try {
        console.log("Power button pressed twice! Triggering emergency protocol...");
        
        // Simulate opening the report page for 10 seconds
        setTimeout(async () => {
            console.log("User did not respond. Sending emergency message...");
            
            // Capture media (1-minute recording)
            const mediaData = await startMediaRecording();
            
            // Send emergency message with location & media
            await sendEmergencyMessage(req.body.phoneNumber, req.body.location, mediaData);
        }, 10000);
        
        res.status(200).json({ message: "Report page opened. Awaiting response..." });
    } catch (error) {
        res.status(500).json({ error: "Failed to handle power button press" });
    }
};