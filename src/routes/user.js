// USER ROUTER
const router = require("express").Router();
const UserController = require("../controller/user");
const { validate } = require("../validation/schemaValidationHelper");
const { validateSignUp } = require("../validation/schema/user");
const authorization = require("../middleware/authorization");

router.post("/signUp", validate(validateSignUp), UserController.signUp);

router.post("/login", UserController.Login);

router.post("/signOut", authorization, UserController.signOut);

module.exports = router;
