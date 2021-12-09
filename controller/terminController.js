
const moment = require('moment');
const behandlung = require('../model/behandlungenModel');
const terminModel = require('../model/terminModel');

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
            date: moment().add("days",i).format("YYYY-MM-DD"),
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
