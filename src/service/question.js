// QUESTION SERVICE
const QuestionModel = require("../model/question");
const logger = require("../config/logger");
const UserModel = require("../model/user");
const CategoryModel = require("../model/category");
const HelperFunction = require("../util/helperFunction");

class QuestionService {
  /**
   * @description - THIS ENDPOINT IS USED TO GET ALL QUESTIONS
   * @returns - RETURNS AN OBJECT
   * @memberof QuestionService
   */

  static async getAllQuestions() {
    try {
      const allQue = await QuestionModel.find({});

      if (!allQue) {
        return {
          statusCode: 404,
          message: "no questions available",
        };
      } else {
        return {
          statusCode: 200,
          message: "questions found",
          data: allQue,
        };
      }
    } catch (err) {
      logger.error(
        `Error found while getting users : ${JSON.stringify(err.message)}`
      );
    }
  }

  /**
   * @description - THIS ENDPOINT ALLOWS USERS TO ASK QUESTIONS
   * @param {object} data - THE OBJECT DATA
   * @returns - RETURNS AN OBJECT
   * @memberof QuestionService
   */

  static async askQuestion(data, req) {
    try {
      let { grade, question, category, userId } = data;

      const { _id } = req.user;

      const categoryExists = await CategoryModel.findById({
        _id: req.body.category,
      });

      if (!categoryExists) {
        return {
          statusCode: 400,
          message: "invalid category id",
        };
      }

      const user = await UserModel.findOne({ _id }).select("_id");

      const askQue = new QuestionModel({
        grade,
        question,
        category,
        userId: user,
      });

      await askQue.save();

      return {
        statusCode: 200,
        message: "question submitted successfully",
        data: askQue,
      };
    } catch (err) {
      logger.error(
        `Error found while asking question at question service : ${JSON.stringify(
          err.message
        )}`
      );
    }
  }

  /**
   * @description - THIS ENDPOINT IS USED TO VOTE UP QUESTION
   * @param {object} data - THE DATA OBJECT
   * @param {object} req - THE REQUEST OBJECT
   * @returns - RETURNS AN OBJECT
   * @memberof QuestionService
   */

  static async voteUpQuestion(data, req) {
    try {
      const { questionId } = data;

      HelperFunction.mongooseIdValidation(questionId);

      const loggedInUserId = req.user._id;

      const question = await QuestionModel.findById(questionId);

      if (!question)
        return {
          statusCode: 404,
          message: "question with provided id not found",
        };

      const alreadyVoted = question.voters.includes(loggedInUserId);

      if (alreadyVoted) {
        question.voters = question.voters.filter(
          (userId) => userId.toString() !== loggedInUserId
        );

        question.voters.pull(loggedInUserId);
        question.vote -= 1;

        await question.save();

        return {
          statusCode: 200,
          message: "vote removed",
        };
      } else {
        question.voters.push(loggedInUserId);
        question.vote += 1;

        await question.save();

        return {
          statusCode: 200,
          message: "voted Up",
        };
      }
    } catch (err) {
      logger.error(
        `Question Service -> Error : ${JSON.stringify(err.message)}`
      );
    }
  }

  /**
   * @description - THIS ENDPOINT IS USED TO VOTE DOWN QUESTION
   * @param {object} data - THE DATA OBJECT
   * @param {object} req - THE REQUEST OBJECT
   * @returns - RETURNS AN OBJECT
   * @memberof QuestionService
   */

  static async voteDownQuestion(data, req) {
    try {
      const { questionId } = data;

      HelperFunction.mongooseIdValidation(questionId);

      const loggedInUserId = req.user._id;

      const question = await QuestionModel.findById(questionId);

      if (!question)
        return {
          statusCode: 404,
          message: "question with provided id not found",
        };

      const alreadyVoted = question.voters.includes(loggedInUserId);

      if (alreadyVoted) {
        question.voters = question.voters.filter(
          (userId) => userId.toString() === loggedInUserId
        );

        question.voters.pull(loggedInUserId);
        question.vote -= 1;

        await question.save();

        return {
          statusCode: 200,
          message: "vote removed",
        };
      }
    } catch (err) {
      logger.error(
        `Question Service -> Error : ${JSON.stringify(err.message)}`
      );
    }
  }

  /**
   *@description - THIS ENDPOINT IS USED TO ANSWER A QUESTION
   * @param {*} data - THE DATA OBJECT
   * @param {*} req - THE REQUEST OBJECT
   * @returns - RETURNS A JSON OBJECT
   * @memberof QuestionService
   */

  static async answerQuestion(data, req) {
    try {
      const { questionId } = data;
      const { answerQuestion } = req.body;

      HelperFunction.mongooseIdValidation(questionId);

      const loggedInUserId = req.user._id;

      const question = await QuestionModel.findById(questionId);

      if (!question)
        return {
          statusCode: 404,
          message: "question not found",
        };

      const updateQuestion = await QuestionModel.findByIdAndUpdate(
        questionId,
        {
          $push: {
            answers: [{ answer: answerQuestion, userId: loggedInUserId }],
          },
        },
        { new: true }
      );

      return {
        statusCode: 200,
        message: "message submitted",
        data: updateQuestion,
      };
    } catch (err) {
      logger.error(`Question Service -> Error : ${err.message}`);
    }
  }
}

module.exports = QuestionService;
