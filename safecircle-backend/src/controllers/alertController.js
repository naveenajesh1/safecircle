const Alert = require('../models/Alert');

exports.sendAlert = async (req, res) => {
    const { userId, location, media } = req.body;
    try {
        const alert = new Alert({ userId, location, media });
        await alert.save();
        res.status(201).json({ message: 'Alert sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending alert' });
    }
};