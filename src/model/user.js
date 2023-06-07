// USER CONTROLLER
const mongoose = require("mongoose"); // Erase if already required
// const mongoosePaginate = require("mongoose-paginate-v2");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    inboxMessages: {
      type: Array,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.plugin(mongoosePaginate);

//Export the model
module.exports = mongoose.model("User", userSchema);
