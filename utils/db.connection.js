const mongoose = require("mongoose")

const  url  = "mongodb://127.0.0.1:27017/first"

const connectToDatabase = async () => {
    await mongoose.connect(url)
    console.log(`Database connected :)`)
}


module.exports = connectToDatabase ;