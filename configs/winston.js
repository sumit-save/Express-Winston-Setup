var winston = require("winston");
var dailyRotateFile = require("winston-daily-rotate-file");
var mongodbTransport = require("winston-mongodb").MongoDB;

var logger;

// For Local Environment
if (process.env.NODE_ENV === "local") {
    logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
            winston.format.prettyPrint(),
            winston.format.colorize(),
            winston.format.printf(data => {
                const timestamp = data.timestamp ? `[${data.timestamp}]` : "";
                const level = data.level ? `[${data.level}]` : "";
                const url = data.url ? `[URL: ${data.url}]` : '';
                const method = data.method ? `[Method: ${data.method}]` : '';
                const message = data.message ? `[Message: ${data.message}]` : '';
                return `${timestamp} ${level} ${url} ${method} ${message}`;
            })
        ),
        transports: [
            new winston.transports.Console(),
        ]
    });
}

// For Production Environment
if (process.env.NODE_ENV === "production") {
    logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
            winston.format.prettyPrint(),
            winston.format.colorize(),
            winston.format.printf(data => {
                const timestamp = data.timestamp ? `[${data.timestamp}]` : "";
                const level = data.level ? `[${data.level}]` : "";
                const url = data.url ? `[URL: ${data.url}]` : '';
                const method = data.method ? `[Method: ${data.method}]` : '';
                const message = data.message ? `[Message: ${data.message}]` : '';
                return `${timestamp} ${level} ${url} ${method} ${message}`;
            })
        ),
        transports: [
            // Daily rotate combined logs
            new dailyRotateFile({
                level: "info",
                filename: "combined.log",
                dirname: "./logs",
                datePattern: "YYYY-MM-DD",
                zippedArchive: true,
                maxSize: "20m",
                maxFiles: "14d"
            }),
            // Daily rotate error logs
            new dailyRotateFile({
                level: "error",
                filename: "error.log",
                dirname: "./logs",
                datePattern: "YYYY-MM-DD",
                zippedArchive: true,
                maxSize: "20m",
                maxFiles: "14d"
            }),
            // Daily rotate mongodb error logs
            new mongodbTransport({
                level: "info",
                db: "mongodb://localhost:27017/winston",
                options: { useUnifiedTopology: true },
                collection: "error_logs",
            })
        ],
    });
}

module.exports = logger;