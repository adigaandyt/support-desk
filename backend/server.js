const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const PORT = process.env.PORT || 5000
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

//Connect to db
console.log("Connecting to database...");
connectDB()

const app = express()

// in order to use URL encoded json that we send in postman
// we set the app to use them like this
//(raw json first, then url encoded)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routes
app.use('/', require('./routes/userRouters'))

//Use the custom error handler  
app.use(errorHandler)

app.listen(PORT, ()=> { console.log("Server started");})
