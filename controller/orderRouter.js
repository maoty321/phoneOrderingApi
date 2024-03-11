const express = require('express')
const orderRouter = express.Router()
const { orderModel, cartModel, userorder } = require('../db')
const { checkuser } = require('../middleware/auth')

orderRouter.get('/getorder/:id', async(req, res) => {
    try {

    } catch (error) {
        res.send(error)
    }
})

orderRouter.post('/checkout', checkuser, async(req, res) => {
    try {
        const ipaddress = req.ip
        const userid = req.session.userid

        const checkcart = await cartModel.find({ ipaddress: ipaddress })
        if (checkcart.length > 0) {
            let generateRannum = Math.floor((Math.random() * 1000000000) + 1)

            const confirmOrder = await orderModel.create({
                userid: userid,
                invoice: generateRannum,
                status: "Order Place",
                payment: "Not payment"

            })
            if (confirmOrder) {
                const cartId = checkcart.map(row => row._id)
                await cartModel.deleteMany({ _id: cartId })

                const findorders = await userorder.find({ ipaddress: ipaddress, status: "Not order" })
                if (findorders) {
                    const orderproductId = findorders.map(row => row._id)

                    const updateData = { userid: userid, invoice: generateRannum, status: "Order Place" }

                    await userorder.updateMany({ _id: orderproductId }, updateData)

                    res.json({
                        "status": 200,
                        "cartid": orderproductId,
                        "message": "Order has been placed"
                    })
                } else {
                    res.send('Cant fetch order product')
                }
            }
        } else {
            res.json({
                'message': 'Item not find in cart'
            })
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = orderRouter