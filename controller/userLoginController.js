//const nodemailer = require("nodemailer");
const User = require("../model/userModel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateRegister = require("../user.schema")

//login
exports.userLogin = async (req, res, next) => {
    let loginuser = req.body

    try {

        let useremail = await User.findOne({ email: loginuser.email })
        console.log(useremail);

        if (useremail === null) {
            return res.status(401).send('incorrect email')
        }

        let comparePasswort = await bcrypt.compare(loginuser.password, useremail.password)

        if (comparePasswort) {

            let token = jwt.sign({
                email: useremail.email,
                userId: useremail._id,
            }, process.env.JWT || 'secret', { expiresIn: '2h' })
            res.status(200).json({
                message: 'You are log it',
                token: token,
                name: useremail.name


            })
            
        } else {
            res.status(401).send('You are  not log it')
        }
    } catch (error) {
        res.status(401).send('Du konntest nicht eingeloggt werden')
    }
}






//signup

exports.getSignup = async (req, res, next) => {

    try {
        const newuser = req.body
        const { error } = validateRegister.validate(newuser)
        if (error)
            return res.status(400).send(error)
        let alreadyuser = await User.find({ $or: [{ email: newuser.email }, { phone: newuser.phone }] })
        if (alreadyuser.length >= 1) {
            return res.status(409).send('There is already a user with this email or phone')
        }

        let passwortGehashed = await bcrypt.hash(newuser.password, 10)
        let createuser = await User.create({ ...newuser, password: passwortGehashed })


        res.status(201).send(createuser);

    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong!')
    }
}