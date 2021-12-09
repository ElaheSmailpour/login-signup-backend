
const moment = require('moment');
const behandlung = require('../model/behandlungenModel');




exports.getBehandlungen = (req, res, next) => {
    behandlung.find().then((ergebnis) => {
        res.status(200).send(ergebnis)
    }).catch((fehler) => {
        res.status(500).send("Fehler : " + fehler)
    })
}


//getTermin
exports.getTermin = async (req, res, next) => {
    const avalableTime = []
    const page=req.query.page || 1;
	console.log("page=",req.query)
	for (let i = (10 * page) - 10; i < 10 * page; i++) {

        const date = {
            date: moment().add("days", i).format("YYYY-MM-DD"),
            hours: [10, 11, 12, 13, 14, 15, 16]
        }
        avalableTime.push(date)
    }
    const terminsData = await termin.find();
    terminsData.forEach(item => {
        const foundeddate = avalableTime.find(dateItem => dateItem.date === item.date)
        if (foundeddate) {

            const foundedHourIndex = foundeddate.hours.findIndex(hour => hour == item.time)
            console.log("foundedHourIndex=", foundedHourIndex)
            foundeddate.hours.splice(foundedHourIndex, 1)
        }
    })
    res.send(avalableTime)
}