require("dotenv").config();
const express = require("express");
const hermesRouter = require("./routes/hermes.routes");

const app = express();

app.use("/me", hermesRouter);

module.exports = app;
