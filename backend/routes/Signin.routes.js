const express = require("express");
const router = express.Router();
const {signIn} = require('../controllers/Signin.controllers');

router.post('/signin', signIn);

module.exports = router;