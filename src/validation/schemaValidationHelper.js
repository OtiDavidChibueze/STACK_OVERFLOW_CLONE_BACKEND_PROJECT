const { errorResponse } = require("../util/responseHelper");
const { logger } = require("../config/logger");

class schemaValidationHelper {
  /**
   * @description - THIS IS USED TO VALIDATE THE INPUT
   * @param {object} schema - THE SCHEMA TO BE VALIDATED
   * @param {object} object - THE OBJECT IN THE SCHEMA
   * @returns {boolean} - RETURNS A BOOLEAN
   * @memberof schemaValidationHelper
   */

  static validateInput(schema, object) {
    const { error, value } = schema.validate(object);
    return { error, value };
  }

  /**
   * @description - THIS IS USED TO VALIDATE THE SCHEMA
   * @param {object} schema - THE SCHEMA TO BE VALIDATED
   * @returns - RETURNS A MESSAGE
   * @memberof schemaValidationHelper
   */

  static validate(schema) {
    return (req, res, next) => {
      const { error } = schemaValidationHelper.validateInput(schema, {
        ...req.body,
        ...req.query,
      });
      if (!error) {
        return next();
      }
      logger.error("error found while validating data in the request body");
      errorResponse(res, 422, error.details[0].message);
    };
  }
}

module.exports = schemaValidationHelper;
