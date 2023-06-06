// AUTHORIZATION AND TOKEN ERROR HANDLERS
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/keys");
const { successResponse, errorResponse } = require("../util/responseHelper");
const logger = require("../config/logger");

const authorization = (req, res, next) => {
  try {
    const token = req.cookies.user || req.cookies.admin;

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
            logger.error("token verification error");
            if (err.name === "TokenExpireDError") {
              logger.error("token expired pls login to refresh");
              return errorResponse(
                res,
                401,
                "token expired pls login to refresh"
              );
            } else {
              logger.error(err.message);
              return errorResponse(res, 400, "invalid token");
            }
          } else {
            logger.info(decodedToken);

            req.user = {
              id: decodedToken.id,
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
    logger.error(err.message);
    return errorResponse(res, 400, "invalid token");
  }
};
