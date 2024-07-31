const express = require ("express");
const { connectMongoDb } = require("./connection/config")
const app = express();
const PORT = 8000;

//connect Database
connectMongoDb("mongodb://127.0.0.1:27017/EventX");

//Middleware


//Routes




app.listen(PORT,()=>{
    console.log("Server started on port 8000");
})
