const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser')

app.use(
  cors({
    credentials: true, // Allow credentials
    origin: "http://localhost:5173", // Specify the origin(s) of your React app
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

app.use("/", require("./routes/authRoutes"));

module.exports = app;
