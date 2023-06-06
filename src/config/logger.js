// LOGGER CONFIG
const { createLogger, transports, format } = require("winston");
const expressWinston = require("express-winston");

const customFormat = format.combine(
  format.json(),
  format.prettyPrint(),
  format.timestamp(),
  format.printf(({ level, message, timestamp }) => {
    return `[${new Date(timestamp).toUTCString()}] : [${level
      .toUpperCase()
      .padEnd(7)}] : ${message}`;
  })
);

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ level: "error", filename: "logsError.log" }),
  ],
  format: customFormat,
});

logger.info = (message) => {
  logger.log({ level: "info", message });
};

logger.warn = (message) => {
  logger.log({ level: "warn", message });
};

logger.error = (message) => {
  logger.log({ level: "error", message });
};

logger.debug = (message) => {
  logger.log({ level: "debug", message });
};

const errorFormat = format.combine(
  format.json(),
  format.prettyPrint(),
  format.timestamp(),
  format.printf(({ level, meta, timestamp }) => {
    return `[${timestamp}] : [${level.toUpperCase()}] : ${meta.message}`;
  })
);

const internalErrorLogger = expressWinston.errorLogger({
  transports: [
    new transports.File({ level: "error", filename: "logsInternalError.log" }),
  ],
  format: errorFormat,
});

module.exports = { logger, internalErrorLogger };
