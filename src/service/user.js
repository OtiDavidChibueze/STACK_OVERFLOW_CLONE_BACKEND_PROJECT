// USER SERVICE

const UserModel = require("../model/user");
const HelperFunction = require("../util/helperFunction");
const logger = require("../config/logger");
const { successResponse, errorResponse } = require("../util/responseHelper");
const TokenHelper = require("../util/token");

class UserService {
  /**
   * @description - THIS ENDPOINT IS USED TO CREATE USER
   * @param {object} data - THE DATA OBJECT
   * @returns - RETURNS AN OBJECT
   * @memberof UserService
   */

  static async register(data) {
    try {
      let { firstName, lastName, email, password, mobile } = data;

      const userExists = await UserModel.findOne({ email });
      if (userExists) {
        return {
          statusCode: 406,
          message: "user already exists , please login",
        };
      }

      const mobileExists = await UserModel.findOne({ mobile });
      if (mobileExists) {
        return {
          statusCode: 406,
          message: "mobile already exists , please use a  different one",
        };
      }

      const hashPassword = await HelperFunction.hashPassword(password);

      const newUser = await new UserModel({
        firstName,
        lastName,
        email,
        password: hashPassword,
        mobile,
      }).save();

      logger.info(`user created with email : ${JSON.stringify(email)}`);

      newUser.password = undefined;

      return {
        statusCode: 201,
        message: "user registered successfully , please login",
        data: newUser,
      };
    } catch (err) {
      logger.error(
        `Error found while logging in user : ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, "oops something went wrong");
    }
  }

  /**
   *@description - THIS ENDPOINT IS USED TO LOGIN IN USERS
   * @param {object} data - THE DATA OBJECT
   * @param {object} res - THE RESPONSE OBJECT
   * @returns - RETURN AN OBJECT
   * @memberof UserService
   */

  static async login(data, res) {
    try {
      const { email, password } = data;

      const user = await UserModel.findOne({ email });

      if (!user) {
        return {
          statusCode: 404,
          message: "user with provided email not found",
        };
      }

      const comparePassword = await HelperFunction.comparePassword(
        password,
        user.password
      );

      if (!comparePassword) {
        return {
          statusCode: 401,
          message: "incorrect password",
        };
      }

      const accessToken = await TokenHelper.generateToken(user);

      logger.info(`user logged in : ${JSON.stringify(email)}`);

      user.password = undefined;

      res.cookie("accessToken", accessToken, {
        maxAge: 1 * 24 * 60 * 24 * 1000,
        httpOnly: true,
      });

      return {
        statusCode: 200,
        message: "user logged in successfully",
        data: { user, accessToken },
      };
    } catch (error) {
      logger.error(
        `Error found while logging in user : ${JSON.stringify(error.message)}`
      );
      return errorResponse(res, 500, "oops something went wrong");
    }
  }

  /**
   * @description - THIS ENDPOINT IS USED TO LOGIN IN USER
   * @param {object} res - THE RESPONSE OBJECT
   * @param {object} req - THE  REQUEST OBJECT
   * @returns - RETURNS AN OBJECT
   * @memberof UserService
   */

  static async logOut(req, res) {
    if (req.user.role !== "user")
      return {
        statusCode: 401,
        message: "unauthorized",
      };

    res.cookie("accessToken", "", { maxAge: 1, httpOnly: true });

    logger.info("user logged out successfully");

    return {
      statusCode: 200,
      message: "logged out successfully",
    };
  }
}

module.exports = UserService;
