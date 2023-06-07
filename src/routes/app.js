// STACK OVERFLOW APPLICATION
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const expressWinston = require("express-winston");
const bodyParser = require("body-parser");
const { logger, internalErrorLogger } = require("../config/logger");
const cookie = require("cookie-parser");

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(cookie());
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

const User_Router = require("../routes/user");

app.use("/api/v1/user", User_Router);

app.use(internalErrorLogger);

module.exports = app;
