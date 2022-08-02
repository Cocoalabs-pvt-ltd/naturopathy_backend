const express = require("express");
const AuthControllers = require("../controllers/AuthControllers");
const router = express.Router();

router.post("/user/signup", AuthControllers.signUp);
router.post("/user/login", AuthControllers.login);

module.exports = router;