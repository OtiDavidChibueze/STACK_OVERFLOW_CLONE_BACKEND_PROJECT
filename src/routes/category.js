// CATEGORY ROUTES
const router = require("express").Router();
const CategoryController = require("../controller/category");
const authorization = require("../middleware/authorization");
const { validate } = require("../validation/schemaValidationHelper");
const { categorySchemaValidation } = require("../validation/schema/category");

router.post(
  "/createCategory",
  authorization,
  validate(categorySchemaValidation),
  CategoryController.createCat
);

module.exports = router;
