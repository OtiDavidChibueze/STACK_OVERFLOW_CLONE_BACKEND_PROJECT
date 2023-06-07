const bcrypt = require("bcrypt");

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
}

module.exports = HelperFunction;
