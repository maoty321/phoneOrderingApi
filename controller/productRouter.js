const express = require('express')
const productRouter = express.Router()
const { uploadimg } = require('../middleware/setupload')
const db = require('../db')


productRouter.post('/addproduct', uploadimg.single('image'), async(req, res) => {
    try {
        var currentdate = new Date()

        var timestamped = currentdate.toLocaleString()

        const data = {
            productname: req.body.productname,
            productDes: req.body.productDes,
            productPrice: req.body.productPrice,
            productColor: req.body.productColor,
            productproductSpecific: req.body.productBrand,
            productSpecific: req.body.productSpecific,
            productimg: req.file.filename,
            dateCreated: timestamped
        }
        await db.productModel.create(data)
        res.json({
            message: "Successful add product",
            status: 200
        })
    } catch (error) {
        res.send(error)
    }
})

productRouter.delete("/deleteproduct/:productId", async(req, res) => {
    try {
        const productId = req.params.productId
        if (!productId) {
            res.json('Get the product before delete')
        } else {
            await db.productModel.findByIdAndDelete(productId)
            res.json({
                status: 200,
                message: "Sucessful delete the product"
            })
        }
    } catch (error) {
        res.send(error)
    }
})


productRouter.put('/updateproduct/:productId', async(req, res) => {
    try {
        const productId = req.params.productId
        if (!productId) {
            res.send('Get the product before delete')
        } else {
            const update = await db.productModel.findByIdAndUpdate(productId, req.body)
            if (update) {
                res.json({
                    status: 200,
                    message: "Sucessful Update the product"
                })
            } else {
                res.json({
                    status: 200,
                    message: "Not find Product"
                })
            }
        }
    } catch (error) {
        res.send(error)
    }
})


module.exports = productRouter