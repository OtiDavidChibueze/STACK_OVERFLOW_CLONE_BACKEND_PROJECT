// DATABASE CONNECTION
const mongoose = require("mongoose");
const logger = require("../config/logger");
const { DB } = require("../config/keys");

const connectToDatabase = () => {
  try {
    mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });

    logger.info("database connected successfully");
  } catch (err) {
    logger.error(`database not connected : ${JSON.stringify(err)}`);
  }
};

module.exports = connectToDatabase;
