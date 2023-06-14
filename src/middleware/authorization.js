// AUTHORIZATION AND TOKEN ERROR HANDLERS
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/keys");
const { successResponse, errorResponse } = require("../util/responseHelper");
const logger = require("../config/logger");

const authorization = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      logger.error("no token provided ");
      return errorResponse(res, 401, "Unauthorized Access");
    } else {
      jwt.verify(
        token,
        SECRET,
        { algorithms: ["HS256"] },
        async (err, decodedToken) => {
          if (err) {
            logger.error("Authorization -> Error : token verification error");
            if (err.name === "TokenExpiredError") {
              logger.error("Authorization -> Error : token expired pls login");
              return errorResponse(
                res,
                401,
                "token expired pls login to refresh"
              );
            } else {
              logger.error(`Authorization -> Error : ${err.message}`);
              return errorResponse(res, 400, "invalid token");
            }
          } else {
            logger.info(decodedToken);

            req.user = {
              _id: decodedToken.userId,
              role: decodedToken.role,
            };

            if (
              req.user.role === "user" ||
              req.user.role === "admin" ||
              req.user.role === "superAdmin"
            ) {
              next();
            } else {
              logger.error("Unauthorized Access");
              return errorResponse(res, 401, "Unauthorized Access");
            }
          }
        }
      );
    }
  } catch (err) {
    logger.error(`Authorization -> Error : ${err.message}`);
    return errorResponse(res, 400, "invalid token");
  }
};

module.exports = authorization;
