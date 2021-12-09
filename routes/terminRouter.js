
const express = require('express')
const router = express.Router()

const {getBehandlungen,getTermin} = require("../controller/terminController")
router.get("/",getTermin)

router.route("/behandlungen").get(getBehandlungen)

module.exports = router