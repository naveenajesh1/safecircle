const express = require('express');
const { sendAlert } = require('../controllers/alertController');
const router = express.Router();

router.post('/send', sendAlert);

module.exports = router;
