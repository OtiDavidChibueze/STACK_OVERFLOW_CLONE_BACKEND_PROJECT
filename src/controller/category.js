// CATEGORY CONTROLLER

const CategoryService = require("../service/category");
const { logger } = require("../config/logger");
const { successResponse, errorResponse } = require("../util/responseHelper");

class CategoryController {
  /**
   * @description - THIS ENDPOINT IS USED TO CREATE CATEGORY
   * @param {object} -  THE REQUEST OBJECT,
   * @param {object} - THE RESPONSE OBJECT
   * @returns - RETURNS A MESSAGE
   * @memberof CategoryController
   */

  static async createCat(req, res) {
    try {
      const { body } = req;

      const result = await CategoryService.createCategory(body);

      if (result == 409)
        return errorResponse(res, result.statusCode, result.message);

      logger.info(`category created successfully : ${JSON.stringify(result)}`);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (err) {
      logger.error(`Error found while create category : ${err}`);
      return errorResponse(res, 500, "Oops something went wrong");
    }
  }
}

module.exports = CategoryController;
