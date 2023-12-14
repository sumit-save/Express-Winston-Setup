const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv/config");
const PORT = process.env.PORT || 8000;

const app = express();

// Middleware
app.use(express.json());

// Winston
const logger = require("./configs/winston");

// Routes
const rootRoutes = require("./routes/router");
app.use("/api/v1.0", rootRoutes);

// Database Connection Using Mongoose ORM
(async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.DATABASE_URL);
        console.log("Database Connected Successfully");
        logger.info("Database Connected Successfully");
    } catch (error) {
        console.log("Unable To Connect MongoDB Database");
        logger.error("Unable To Connect MongoDB Database");      
    }
})();

// Create Server On Localhost:8000
(async () => {
    try {
        app.listen(PORT);
        console.log(`Server Started On Localhost:${PORT}`);
        logger.info(`Server Started On Localhost:${PORT}`);
    } catch (error) {
        console.log(`Unable To Start Server On Localhost:${PORT}`);
        logger.error(`Unable To Start Server On Localhost:${PORT}`);
    }
})();