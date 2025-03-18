const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");  // Import the Express app

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = require("./config/db");
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful shutdown (Ctrl+C)
process.on("SIGINT", async () => {
    console.log("🛑 Shutting down server...");
    await mongoose.connection.close();
    console.log("✅ MongoDB Disconnected.");
    process.exit(0);
});
