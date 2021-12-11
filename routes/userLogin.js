const express = require('express')

const router = express.Router()

const { getSignup,userLogin } = require("../controller/userLoginController")


router.post("/login",userLogin)
router.post("/signup",getSignup)


module.exports = router