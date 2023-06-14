// QUESTION VALIDATION
const joi = require("joi");

module.exports.questionSchemaValidation = joi.object({
  userId: joi.string().regex(/^[a-fA-F0-9]{24}$/),
  grade: joi.string().required(),
  category: joi
    .string()
    .regex(/^[a-fA-F0-9]{24}$/)
    .required(),
  question: joi.string().required().min(15),
});
