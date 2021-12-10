var cache = require('js-cache');
const moment = require('moment');
const behandlung = require('../model/behandlungenModel');
const terminModel = require('../model/terminModel');
const user = require('../model/userModel');
exports.getBehandlungen = (req, res, next) => {
    behandlung.find().then((ergebnis) => {
        res.status(200).send(ergebnis)
    }).catch((fehler) => {
        res.status(500).send("Fehler : " + fehler)
    })
}


//getTermin
exports.getTermin = async (req, res, next) => {
    const avalaibleTimes = []
    for (i = 0; i < 5; i++) {
        const date = {
            date: moment().add("days", i).format("YYYY-MM-DD"),
            hours: [10, 11, 12, 13, 14, 15, 16]
        }
        avalaibleTimes.push(date)
    }

    const terminsData = await terminModel.find();

    terminsData.forEach(item => {
        const foundedDate = avalaibleTimes.find(dateItem => dateItem.date === item.date)
        if (foundedDate) {
            const foundedHourIndex = foundedDate.hours.findIndex(hour => hour === item.time)
            foundedDate.hours.splice(foundedHourIndex, 1)
        }

    })
    res.send(avalaibleTimes)
}
//getTerminBestätigung

exports.getTerminBestätigung = (req, res, next) => {
    const phone = req.params.phone;
    const code = Math.floor(Math.random() * 10000);
    console.log("code=", code)
    cache.set(phone, code)
    res.send(200)
}
//buchen
exports.buchen = async (req, res, next) => {
    const phone = req.params.phone;
    const code = req.params.code;
    const exitCode = cache.get(phone)
    console.log("exitCode=", exitCode)
    if (code == exitCode) {
        let userFind = await user.findOne({ phone: phone })
        if (!userFind){
            userFind = await user.create({ name: req.body.name, phone })

    }
    const createTermin = await terminModel.create({
        time: req.body.time,
        date: req.body.date,
        userId: userFind._id
    })
    res.send(createTermin)
}
    else
    res.send(401)
}
