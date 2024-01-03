
const mongoose = require("mongoose");

const connectdb = async() =>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connect successfully", connect.connection.host, connect.connection.name);
    }catch(err){
        console.log("Error to connect db:", err);
        process.exit(1);
    }
}

module.exports = connectdb;
