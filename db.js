const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/phoneOrdering')

const productSchema = new mongoose.Schema({
    productname: {
        type: String
    },
    productDes: {
        type: String
    },
    productimg: {
        type: String
    },
    productColor: {
        type: String
    },
    productPrice: {
        type: String
    },
    productBrand: {
        type: String
    },
    productSpecific: {
        type: String
    },
    dateCreated: {
        type: String
    }
});

const cartSchema = new mongoose.Schema({
    ipaddress: {
        type: String
    },
    productId: String,
    quantity: String,
    userId: String
})

const userorders = new mongoose.Schema({
    ipaddress: {
        type: String
    },
    productId: String,
    quantity: String,
    userid: String,
    invoice: String,
    status: String
})


const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

const orderScheme = new mongoose.Schema({
    userid: String,
    invoice: String,
    status: String,
    payment: String
})


const userModel = mongoose.model('users', userScheme)
const productModel = mongoose.model('product', productSchema);
const userorder = mongoose.model('orderhistory', userorders);
const cartModel = mongoose.model('cart', cartSchema)
const orderModel = mongoose.model('order', orderScheme)
module.exports = { productModel, cartModel, userModel, orderModel, userorder };