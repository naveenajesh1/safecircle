const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        
        // Listen for connection errors
        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB Connection Error:", err);
        });

        // Handle disconnections
        mongoose.connection.on("disconnected", () => {
            console.warn("⚠️ MongoDB Disconnected! Attempting to reconnect...");
            setTimeout(connectDB, 5000); // Retry connection after 5 seconds
        });

    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
