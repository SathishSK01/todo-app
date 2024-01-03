 const express = require("express");
 const connectdb = require("./config/dbConnection");
 const errorHandling = require("./middleware/errorHandling");
 const dotenv = require("dotenv").config();

 connectdb();
 const app = express();

 const port = process.env.PORT || 8081;
 app.use(express.json());
 app.use(errorHandling);

 app.use("/api/auth", require('./Routes/userRoute'));
 app.use("/api/task", require('./Routes/taskRoute'));

 app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
 });