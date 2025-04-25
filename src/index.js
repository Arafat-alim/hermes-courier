require("dotenv").config();
const express = require("express");
const cors = require("cors");
const hermesRouter = require("./routes/hermes.routes");
const { handleTestLiveServer } = require("./controller/hermes.controller");

const app = express();

//! Middlewares
app.use(cors());
app.use(express.json()); // This must be here before any routes

app.use("/", handleTestLiveServer);
app.use("/api/v1", hermesRouter);

module.exports = app;
