const express = require("express");
const { SignIn, signUp, signIn } = require("../controllers/Auth.controller");
const router = express.Router();
// route to signin
router.post("/api/signup", signUp);
// route to signup
router.post("/api/signin", signIn);
module.exports = router;
