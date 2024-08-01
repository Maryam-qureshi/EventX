const express = require ("express");
const { connectMongoDb } = require("./connection/config")
const userRoutes = require('./routes/userRoute');
const eventRoutes = require('./routes/eventRoute');
const app = express();
const PORT = 8000;

//connect Database
connectMongoDb("mongodb://127.0.0.1:27017/EventX");

//Middleware
app.use (express.urlencoded({extended: false}));

//Routes
app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes)

app.listen(PORT,()=>{
    console.log("Server started on port 8000");
})
