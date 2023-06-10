const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

class HelperFunction {
  /**
   * @description - THIS IS USED TO HASH A PASSWORD
   * @param {string} password - THE PASSWORD TO BE HASHED
   * @returns - RETURNS THE METHODS TO HASH PASSWORD
   * @memberof HelperFunction
   */

  static async hashPassword(password) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }

  /**
   * @description - THIS IS USED TO COMPARE PASSWORD
   * @param {string} password - THE PROVIDED PASSWORD
   * @param {string} hashedPassword - THE HASHED PASSWORD TO BE COMPARED WITH
   * @returns - RETURNS THE METHODS TO COMPARE THE PASSWORD
   * @memberof HelperFunction
   */
  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async mongooseIdValidation(id) {
    const validId = mongoose.isValidObjectId(id);

    if (!validId) throw new Error("invalid mongoose id");
  }
}

module.exports = HelperFunction;
