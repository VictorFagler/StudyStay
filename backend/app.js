const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const listingRoutes = require("./routes/listingRoutes");
const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const bodyParser = require("body-parser");

app.use(
  cors({
    credentials: true, // Allow credentials
    origin: "http://localhost:5173", // Specify the origin(s) of your React app
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
  })
);
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/", listingRoutes);
app.use("/", applicationRoutes);

// Handling undefined routes
app.use((req, res, next) => {
  res.status(404).send("Route not found.");
});

module.exports = app;
