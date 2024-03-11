const express = require('express')
const app = express()
const port = 4000
const boodyParser = require('body-parser')
const session = require('express-session')
const productRouter = require('./controller/productRouter')
const cartRouter = require('./controller/cartRouter')
const userRouter = require('./controller/userRouterr')
const orderRouter = require('./controller/orderRouter')

app.use(session({
    secret: 'Maoty',
    saveUninitialized: true,
    resave: false
}))
app.use(express.json())
app.use(boodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.use('/users', userRouter)
app.use('/order', orderRouter)

app.listen(port, () => {
    console.log(`port conected to http://127.0.0.1:${port}`)
})