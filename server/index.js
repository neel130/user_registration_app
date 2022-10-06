const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();
const connectDataBase = require('./mongoDB/connection');
connectDataBase();


const app = express();

// Middleware 
app.use(express.json());
app.use(cors())


// Routes Importing 
const authRoute = require("./routes/auth-router");
const userRoute = require("./routes/user-router");


// ROUTES 
app.use("/auth",authRoute);
app.use("/user",userRoute);






app.listen(process.env.PORT || 5000,()=>{
    console.log("server is running on port no "+process.env.PORT)
})
