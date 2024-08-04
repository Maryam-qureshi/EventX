<<<<<<< HEAD
const express = require("express");
const { connectMongoDb } = require("./connection/config");
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUsersOnly } = require("./middleware/auth");
const userRoutes = require("./routes/userRoute");
const eventRoutes = require("./routes/eventRoute");
const staticRoute = require("./routes/staticRouter");
=======
const express = require ("express");
const { connectMongoDb } = require("./connection/config")
const userRoutes = require('./routes/userRoute');
const eventRoutes = require('./routes/eventRoute');
>>>>>>> e8dc6015e82a6a90ad127145c5b04d6551dcc69b
const app = express();
const PORT = 8000;

//Connect Database
connectMongoDb("mongodb://127.0.0.1:27017/EventX");

<<<<<<< HEAD
//Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes
app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/", staticRoute);

app.listen(PORT, () => {
  console.log("Server started on port 8000");
});
=======
//Middleware
app.use (express.urlencoded({extended: false}));

//Routes
app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes)

app.listen(PORT,()=>{
    console.log("Server started on port 8000");
})
>>>>>>> e8dc6015e82a6a90ad127145c5b04d6551dcc69b
