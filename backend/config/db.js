//database connection file
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        //taking the mongo uri variable (the mongoose link) it connects
        // and awaits for the promise that connect returns
        const conn = await mongoose.connect(process.env.MONGO_URI)
        //Show connectiong, cyan underline are from the colors package just for looks
        console.log(`MongoDB connected ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exist(1)
    }
}


module.exports = connectDB