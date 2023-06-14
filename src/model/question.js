const mongoose = require("mongoose"); // Erase if already required
const mongoosePaginate = require("mongoose-paginate-v2");

// Declare the Schema of the Mongo model
var questionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    grade: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    vote: {
      type: Number,
      default: 0,
    },
    voters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    answers: [
      {
        answer: {
          type: String,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        vote: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

questionSchema.plugin(mongoosePaginate);

//Export the model
module.exports = mongoose.model("Question", questionSchema);
