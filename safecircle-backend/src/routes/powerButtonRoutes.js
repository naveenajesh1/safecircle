const express = require("express");
const { handlePowerButtonPress } = require("../controllers/powerButtonController");
const router = express.Router();

router.post("/press", handlePowerButtonPress);

module.exports = router;
