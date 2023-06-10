const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/keys");

class TokenHelper {
  /**
   *@description - THIS IS USED TO GENERATE TOKEN
   * @param {object} user - THE USER THE TOKEN IS TO BE ADDED
   * @returns - RETURNS THE TOKEN
   * @memberof Token
   */

  static async generateToken(user) {
    const payload = {
      userId: user.id,
      role: user.role,
    };

    const options = {
      expiresIn: 1 * 24 * 60 * 24,
    };

    try {
      const token = jwt.sign(payload, SECRET, options);
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = TokenHelper;
