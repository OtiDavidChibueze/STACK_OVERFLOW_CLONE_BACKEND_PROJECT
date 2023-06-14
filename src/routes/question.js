// QUESTION ROUTES
const router = require("express").Router();
const QuestionController = require("../controller/question");
const authorization = require("../middleware/authorization");
const { questionSchemaValidation } = require("../validation/schema/question");
const { validate } = require("../validation/schemaValidationHelper");

router.get("/", QuestionController.getAllQue);

router.post(
  "/voteUp/:questionId",
  authorization,
  QuestionController.voteUpQues
);

router.post(
  "/voteDown/:questionId",
  authorization,
  QuestionController.voteDownQue
);

router.post(
  "/askQuestion",
  authorization,
  validate(questionSchemaValidation),
  QuestionController.askQue
);

router.post("/answer/:questionId", authorization, QuestionController.answerQue);

module.exports = router;
