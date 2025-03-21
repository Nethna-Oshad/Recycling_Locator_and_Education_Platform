const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const wastestockRoutes = require('./routes/WastestockRoute');
const routeRoutes = require('./routes/RouteRoute');
const collectingToolRoutes = require("./routes/CollectingtoolRoute");
const requestRoutes = require("./routes/RequestRoute");
const userRouter = require("./routes/UserRoute");

const PORT = process.env.PORT || 8070;
const MONGODB_URL = process.env.MONGODB_URL;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Use Routes
app.use('/waste', wastestockRoutes);
app.use('/routes', routeRoutes);
app.use("/api/collectingtool", collectingToolRoutes);
app.use("/api/request", requestRoutes);
app.use("/users", userRouter);

// Default Route
app.get('/', (req, res) => {
    res.send("🚀 Waste Management System is Running!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Invalid JSON received:', req.body);
        return res.status(400).json({ error: 'Invalid JSON format in request body' });
    }
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
    next(err);
});

// MongoDB Connection
if (!MONGODB_URL) {
    console.error("❌ ERROR: MONGODB_URL is undefined. Check your .env file.");
    process.exit(1);
}

mongoose.connect(MONGODB_URL);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("✅ MongoDB Connection Successful!");
});

connection.on("error", (err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});