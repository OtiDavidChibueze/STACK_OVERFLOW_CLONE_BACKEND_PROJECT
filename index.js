// INDEX FILE
const server = require("./src/routes/app");
const connectToDatabase = require("./src/config/db");
const { PORT } = require("./src/config/keys");
const { logger } = require("./src/config/logger");

const port = PORT || 2020;

connectToDatabase();

server.listen(port, () => {
  logger.info(`listening to port : ${PORT}`);
});
