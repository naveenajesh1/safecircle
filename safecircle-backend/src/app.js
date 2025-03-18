const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); // Body parser
app.use(cors({ origin: "*" })); // Allow all origins (for development)

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;
