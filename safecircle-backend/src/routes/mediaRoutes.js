const express = require("express");
const { startMediaRecording } = require("../controllers/mediaController");
const router = express.Router();

router.get("/record", async (req, res) => {
    const mediaData = await startMediaRecording();
    res.json({ media: mediaData });
});

module.exports = router;
