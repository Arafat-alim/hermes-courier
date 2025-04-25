const express = require("express");
const { handleTestLiveServer } = require("../controller/hermes.controller");

const hermesRouter = express.Router();

hermesRouter.get("/", handleTestLiveServer);

module.exports = hermesRouter;
