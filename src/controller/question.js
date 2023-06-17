// QUESTION CONTROLLER
const QuestionService = require("../service/question");
const { errorResponse, successResponse } = require("../util/responseHelper");
const logger = require("../config/logger");

class QuestionController {
  /**
   * @description - RETURNS A JSON OBJECT
   * @param {object} req - THE REQUEST OBJECT
   * @param {object} res - THE RESPONSE OBJECT
   * @returns - RETURNS JSON OBJECT
   * @memberof QuestionController
   */

  static async getAllQue(req, res) {
    try {
      const result = await QuestionService.getAllQuestions();

      if (result == 409)
        return errorResponse(res, result.statusCode, result.message);

      logger.info(`Question Controller -> Info : Gotten all questions : ${JSON.stringify(result.data)}`);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (err) {
      logger.error(
        `Error found while getting questions : ${JSON.stringify(err.message)}`
      );
      return errorResponse(res, 409, "Oops something went wrong..");
    }
  }

  /**
   *@description - RETURNS A JSON OBJECT
   * @param {object} req - THE REQUEST OBJECT
   * @param {object} res - THE RESPONSE OBJECT
   * @returns - RETURNS JSON OBJECT
   * @memberof QuestionController
   */

  static async askQue(req, res) {
    if (req.user.role !== "user") {
      logger.error("Unauthorized Access");
      return errorResponse(res, 401, "UnAuthorized Access");
    }
    try {
      const { body } = req;

      const result = await QuestionService.askQuestion(body, req);
      if (result.statusCode == 409)
        return errorResponse(res, result.statusCode, result.message);

      logger.info( Question Controller -> Info : 
        `question submitted successfully : ${JSON.stringify(result.data)}`
      );
      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (err) {
      logger.error(
        `Error found while asking question at question controller : ${JSON.stringify(
          err.message
        )}`
      );
      return errorResponse(res, 500, "Oops something went wrong");
    }
  }

  /**
   *@description - RETURNS A JSON OBJECT
   * @param {object} req - THE REQUEST OBJECT
   * @param {object} res - THE RESPONSE OBJECT
   * @returns - RETURNS JSON OBJECT
   * @memberof QuestionController
   */

  static async voteUpQues(req, res) {
    if (req.user.role !== "user") {
      logger.error("Unauthorized Access");
      return errorResponse(res, 401, "UnAuthorized Access");
    }

    try {
      const { params } = req;

      const result = await QuestionService.voteUpQuestion(params, req);

      if (result.statusCode == 409)
        return errorResponse(res, result.statusCode, result.message);

      logger.info(`Question Controller -> user voted up : ${JSON.stringify(result.data)} `);
      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (err) {
      logger.error(
        `Error found while voting up question at question controller : ${JSON.stringify(
          err.message
        )}`
      );
      return errorResponse(res, 500, "Oops something went wrong");
    }
  }

  /**
   *@description - RETURNS A JSON OBJECT
   * @param {object} req - THE REQUEST OBJECT
   * @param {object} res - THE RESPONSE OBJECT
   * @returns - RETURNS JSON OBJECT
   * @memberof QuestionController
   */

  static async voteDownQue(req, res) {
    if (req.user.role !== "user")
      return errorResponse(res, 401, "Unauthorized Access");

    try {
      const { params } = req;

      const result = await QuestionService.voteDownQuestion(params, req);

      if (result == 409)
        return errorResponse(res, result.statusCode, result.message);

      logger.info(`Question Controller ->   Info : user voted down : ${JSON.stringify(result.data)}` );

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (err) {
      logger.error(`Question Controller -> Error : ${err.message}`);
      return errorResponse(res, 406, "vote removed already");
    }
  }

  /**
   * @description -  RETURNS A JSON OBJECT
   * @param {object} req - THE REQUEST OBJECT
   * @param {object} res - THE RESPONSE OBJECT
   * @returns - RETURNS A JSON OBJECT
   * @memberof QuestionController
   */

  static async answerQue(req, res) {
    if (req.user.role !== "user")
      return errorResponse(res, 401, "Unauthorized Access");

    try {
      const result = await QuestionService.answerQuestion(req.params, req);

      if (result.statusCode == 409)
        return errorResponse(res, result.statusCode, result.message);

      logger.info(`Question Controller -> Info : answer submitted : ${result.data} `);
      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (err) {
      logger.error(`Question Controller -> Error : ${err.message}`);
      return errorResponse(res, 500, "Oops something went wrong");
    }
  }
}

module.exports = QuestionController;
