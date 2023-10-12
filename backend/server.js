const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log("server running on http://localhost:" + PORT)
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err.message));
