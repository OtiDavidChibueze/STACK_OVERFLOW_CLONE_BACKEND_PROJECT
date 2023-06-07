// USER SIGN UP VALIDATION
const joi = require("joi");

module.exports.validateSignUp = joi
  .object({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(20).required().max(11),
    mobile: joi
      .string()
      .regex(/^0[0-9]{10}$/)
      .max(11)
      .required(),
    role: joi.string().default("user"),
    passwordResetToken: joi.string().regex(/^[a-fA-F0-9]{24}$/),
  })
  .options({ stripUnknown: true });
