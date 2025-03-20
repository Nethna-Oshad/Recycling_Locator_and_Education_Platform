const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Initialize Express App
const app = express();
dotenv.config();  // Load environment variables

// Import Route Files
const wastestockRoutes = require('./routes/WastestockRoute');
const routeRoutes = require('./routes/RouteRoute'); // Correctly reference RouteRoute.js
const collectingToolRoutes = require("./routes/CollectingtoolRoute");
const requestRoutes = require("./routes/RequestRoute");
const userRouter = require("./routes/UserRoute");

const PORT = process.env.PORT || 8070;
const MONGODB_URL = process.env.MONGODB_URL;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Use Routes
app.use('/waste', wastestockRoutes);
app.use('/routes', routeRoutes);  // Add the route handler for /routes
app.use("/api/collectingtool", collectingToolRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/users", userRouter);

// ✅ Default Route (For Testing)
app.get('/', (req, res) => {
    res.send("🚀 Waste Management System is Running!");
});

// ✅ MongoDB Connection
if (!MONGODB_URL) {
    console.error("❌ ERROR: MONGODB_URL is undefined. Check your .env file.");
    process.exit(1); // Stop execution if MongoDB URL is missing
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

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
