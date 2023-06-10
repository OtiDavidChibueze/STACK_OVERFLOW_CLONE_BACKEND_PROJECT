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

    new transports.File({ level: "warn", filename: "appDevelopmentError.log" }),
    new transports.File({
      level: "error",
      filename: "appDevelopmentError.log",
    }),
    new transports.File({
      level: "silent",
      filename: "appDevelopmentSilent.log",
    }),
  ],
  format: customFormat,
});

const errorFormat = format.combine(
  format.json(),
  format.prettyPrint(),
  format.timestamp(),
  format.printf(({ level, meta, timestamp }) => {
    return `[${new Date(
      timestamp
    ).toUTCString()}] : [${level.toUpperCase()}] : ${meta.message}`;
  })
);

const internalErrorLogger = expressWinston.errorLogger({
  transports: [
    new transports.File({
      level: "error",
      filename: "appDevelopmentInternalError.log",
    }),
  ],
  format: errorFormat,
});

module.exports = { logger, internalErrorLogger };
