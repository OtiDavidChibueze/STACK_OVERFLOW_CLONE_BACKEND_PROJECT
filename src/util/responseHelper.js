class responseHelper {
  /**
   * @description - THIS IS SUCCESS RESPONSE ENDPOINT
   * @param {object} res - THE RESPONSE OBJECT
   * @param {number} statusCode - TAKES IN A STATUS CODE
   * @returns {object} - RETURNS A MESSAGE
   * @memberof responseHelper
   */

  static successResponse(res, statusCode, message, data) {
    return res.status(statusCode).json({ status: "success", message, data });
  }

  /**
   * @description - THIS IS ERROR RESPONSE ENDPOINT
   * @param {object} res - THE RESPONSE OBJECT
   * @param {number} statusCode - TAKES IN A STATUS CODE
   * @returns {object} - RETURNS A MESSAGE
   * @memberof responseHelper
   */

  static errorResponse(res, statusCode, message) {
    return res.status(statusCode).json({ status: "failed", message });
  }
}

module.exports = responseHelper;
