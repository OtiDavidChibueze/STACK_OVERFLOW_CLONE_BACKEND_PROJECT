// CATEGORY SCHEMA VALIDATION
const joi = require("joi");

module.exports.categorySchemaValidation = joi
  .object({
    name: joi.string().required().min(3),
    icon: joi.string(),
    color: joi.string(),
  })
  .options({ stripUnknown: true });
