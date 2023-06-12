// STACK OVERFLOW APPLICATION
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookie = require("cookie-parser");

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(cookie());

const User_Routes = require("../routes/user");
const Question_Routes = require("../routes/question");
const Category_Routes = require("../routes/category");

app.use("/api/v1/user", User_Routes);
app.use("/api/v1/question", Question_Routes);
app.use("/api/v1/category", Category_Routes);

module.exports = app;
