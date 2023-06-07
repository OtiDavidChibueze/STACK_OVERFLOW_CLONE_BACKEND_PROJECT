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

const User_Routes = require("../routes/user");
const Question_Routes = require("../routes/question");
const Category_Routes = require("../routes/category");

app.use("/api/v1/user", User_Routes);
app.use("/api/v1/question", Question_Routes);
app.use("/api/v1/category", Category_Routes);

app.use(internalErrorLogger);

module.exports = app;
