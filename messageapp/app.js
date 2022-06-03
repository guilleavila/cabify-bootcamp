require("dotenv/config");

require("./db")

const express = require("express");

const app = express();

require("./config")(app);

const serviceRoutes = require("./routes/index.routes");
app.use("/", serviceRoutes);

require("./error-handling")(app);

module.exports = app;
