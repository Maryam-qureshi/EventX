const express = require("express");
const { connectMongoDb } = require("./connection/config");
const path = require("path");
const userRoutes = require("./routes/userRoute");
const eventRoutes = require("./routes/eventRoute");
const staticRoute = require("./routes/staticRouter");
const app = express();
const PORT = 8000;

//Connect Database
connectMongoDb("mongodb://127.0.0.1:27017/EventX");

//Set view engine
app.set("view engine", "ejs");
app.set("view", path.resolve("./views"));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Set the views directory
app.set("views", path.join(__dirname, "views"));

//Routes
app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/", staticRoute);

app.listen(PORT, () => {
  console.log("Server started on port 8000");
});
