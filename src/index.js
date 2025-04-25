require("dotenv").config();
const express = require("express");
const hermesRouter = require("./routes/hermes.routes");

const app = express();

app.use("/", hermesRouter);

module.exports = app;
