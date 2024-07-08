const express = require("express"); 
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// Importing Routers
const userRouter = require("./routers/user");


// Integrating the Env Varible
require("dotenv/config")
const api = process.env.API_URL || 3000;
const mongoDBUrl = process.env.MONGO_URL;

// MongoDB connection 
mongoose.connect(mongoDBUrl).then(createdCon => {
    console.log("Connected");
}).catch(err => {
    console.log("Could not Connect to MongoDB", err);
});

//Middleware 
app.use(bodyParser.json()); 

// Routers
app.use(`${api}/users`, userRouter)

// Listening to the sever 
app.listen(3000, () => {
    console.log("Server started http://localhost:3000");
})