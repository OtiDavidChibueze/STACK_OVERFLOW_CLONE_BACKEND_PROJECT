// USER CONTROLLER
const { successResponse, errorResponse } = require("../util/responseHelper");
const { logger } = require("../config/logger");
const UserService = require("../service/user");

class UserController {
  /**
   * @description - THIS ENDPOINT IS USED TO SIGN UP A USER
   * @param {object} req - THE REQUEST OBJECT
   * @param {object} res - THE REQUEST OBJECT
   * @returns  - RETURNS A MESSAGE
   * @memberof userController
   */

  static async signUp(req, res) {
    try {
      const { body } = req;

      const result = await UserService.register(body);

      if (result == 409)
        return errorResponse(res, result.statusCode, result.message);

      logger.info(`user created with email : ${JSON.stringify(result)}`);
      return successResponse(
        res,
        201,
        "user registered successfully , please login",
        result
      );
    } catch (err) {
      logger.error(
        `Error found in creating user : ${JSON.stringify(err.message)}`
      );
    }
  }

  /**
   * @description - THIS ENDPOINT IS USED TO SIGN IN USERS
   * @param {object} req - THE REQUEST OBJECT
   * @param {object} res - THE RESPONSE OBJECT
   * @returns - RETURNS A MESSAGE
   * @memberof UserService
   */

  static async Login(req, res) {
    try {
      const { body } = req;

      const result = await UserService.login(body, res);

      if (result.statusCode == 409)
        return errorResponse(res, result.statusCode, result.message);

      logger.info(`user logged in successfully : ${result}`);
      return successResponse(res, result.statusCode, result.message, result);
    } catch (error) {
      logger.error(`Error found while logging in user : ${error.message}`);
      return errorResponse(res, 500, error.message);
    }
  }

  /**
   * @description - THIS ENDPOINT IS USED TO SIGN OUT USERS
   * @param {object} req - THE REQUEST OBJECT
   * @param {object} res - THE RESPONSE OBJECT
   * @returns - RETURNS A MESSAGE
   * @memberof UserController
   */

  static async signOut(req, res) {
    try {
      const result = UserService.logOut(req, res);

      if (result == 409)
        return errorResponse(res, result.statusCode, result.message);

      logger.info("user logged out successfully");
      return successResponse(res, 200, "user logged out successfully");
    } catch (err) {
      logger.info(
        `Error found while logging out user : ${JSON.stringify(err)}`
      );
    }
  }
}

module.exports = UserController;
