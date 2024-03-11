const express = require('express')
const cartRouter = express.Router()
const { cartModel, productModel, userorder } = require('../db')

cartRouter.post('/addtocart/:productId', async(req, res) => {
    try {
        const ipaddress = req.ip;
        const productId = req.params.productId;
        const cartdata = await cartModel.find({ ipaddress, productId });

        if (cartdata.length > 0) {
            res.send("Already in cart");
        } else {
            const data = {
                ipaddress: ipaddress,
                productId: productId,
                userid: 0,
                quantity: 1
            }
            const addcart = await cartModel.create(data)
            if (addcart) {
                const data = {
                    ipaddress: ipaddress,
                    productId: productId,
                    userid: 0,
                    quantity: 1,
                    status: "Not order",
                    invoice: "0"
                }
                await userorder.create(data)
                res.send('Successful add to cart')
            } else {
                res.send('internal server down')
            }

        }
    } catch (error) {
        res.send(error);
    }
});

cartRouter.get('/viewcart', async(req, res) => {
    try {
        const ipaddress = req.ip
        const cartdata = await cartModel.find({ ipaddress })
        if (cartdata) {
            const getproductId = cartdata.map(row => row.productId)
                // const getproductId = cartdata.productId
            if (cartdata) {
                const getProduct = await productModel.find({ _id: getproductId });
                res.json({
                    "getProduct id": getproductId,
                    "getProduct": getProduct
                })

            } else {
                res.send('Empty Cart')
            }
        }

    } catch (error) {
        res.send(error)
    }

})

cartRouter.delete('/deletecart/:productId', async(req, res) => {
    try {
        const productId = req.params.productId
        const deletecart = await cartModel.deleteMany({ productId: productId })
        if (deletecart) {
            await userorder.deleteMany({ productId: productId })
            res.send('Successful delete')
        } else {
            res.send('cannt delete')
        }

    } catch (error) {
        res.send(error)
    }
})

// const getPrice = (req, res => {

// })

module.exports = cartRouter