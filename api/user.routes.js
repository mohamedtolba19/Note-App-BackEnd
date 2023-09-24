const { validateuser} = require("../middelware/validation/user.validation");
const { signup, signin } = require("../services/user.service");
const router = require("express").Router();

router.post("/signup" ,validateuser, signup)
router.post("/signin" ,validateuser, signin)


module.exports = router