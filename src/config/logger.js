const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  format: format.combine(
    format.json(),
    format.timestamp({ format: "ddd, DD MMM YYYY HH:mm:ss [GTM]" }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] - [${level.toUpperCase()}] - ${message}`;
    })
  ),

  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),

    new transports.File({ filename: "appDevelopment.log" }),
  ],

  exceptionHandlers: [
    new transports.File({ filename: "exceptionDevelopment.log" }),
  ],

  exitOnError: false,
});

module.exports = logger;
