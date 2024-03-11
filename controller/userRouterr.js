const express = require('express')
const userRouter = express.Router()
const { userModel } = require('../db')

userRouter.post('/newusers', async(req, res) => {
    try {
        const checkuser = await userModel.findOne({ email: req.body.email })
        if (checkuser) {
            res.send('User already exits')
        } else {
            await userModel.create(req.body)
            res.send(req.body)
        }
    } catch (error) {
        res.send(error)
    }
})

userRouter.post("/login", async(req, res) => {
    try {
        const checkuser = await userModel.findOne({ email: req.body.email })
        if (checkuser.password == req.body.password) {
            req.sessionID
            req.session.userid = checkuser.id
            res.send('Login Successful')
        } else {
            res.send('invalid details')
        }
    } catch (error) {
        res.send(error)
    }
})


module.exports = userRouter