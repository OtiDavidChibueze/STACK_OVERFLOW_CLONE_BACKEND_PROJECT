const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
});

//Export the model
module.exports = mongoose.model("Category", CategorySchema);
