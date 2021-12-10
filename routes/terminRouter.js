
const express = require('express')
const router = express.Router()

const {getBehandlungen,getTermin,getTerminBestätigung,buchen} = require("../controller/terminController")
router.get("/",getTermin)

router.route("/verfiyPhone/:phone").get(getTerminBestätigung)
router.route("/behandlungen").get(getBehandlungen)
router.route("/verfiyPhone/:phone/:code").post(buchen)
module.exports = router