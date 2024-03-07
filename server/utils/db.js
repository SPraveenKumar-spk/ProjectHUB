const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
const connectdb =async()=>{
    try {
        await mongoose.connect(URI);
        console.log("Connection is successful to the database");
    } catch (error) {
        console.log(error);
        console.log("Connection failed to batabase");
        process.exit(0);
    }
}

module.exports = connectdb;