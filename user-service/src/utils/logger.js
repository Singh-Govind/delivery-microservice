// src/utils/logger.js
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: "info", 
  format: combine(
    colorize(),
    timestamp(),
    customFormat
  ),
  transports: [
    new transports.Console(), 
    new transports.File({ filename: "logs/error.log", level: "error" }), 
  ],
});

module.exports = logger;
