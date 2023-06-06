const bcrypt = require("bcrypt");

class HelperFunction {
  static async hashPassword(password) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = HelperFunction;
