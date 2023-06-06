const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/keys");

class TokenHelper {
  /**
   *
   * @param {object} user -
   * @returns
   */

  static async generateToken(user) {
    const payload = {
      userId: user.id,
      role: user.role,
    };

    const options = {
      expiresIn: 1 * 24 * 60 * 1000,
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
