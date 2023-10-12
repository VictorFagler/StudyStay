const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const listingRoutes = require("./routes/listingRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(
  cors({
    credentials: true, // Allow credentials
    origin: "http://localhost:5173", // Specify the origin(s) of your React app
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/", listingRoutes);

module.exports = app;
