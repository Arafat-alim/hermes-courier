const express = require("express");
const { handleGetLiveServer } = require("../controller/hermes.controller");

const hermesRouter = express.Router();

hermesRouter.get("/", handleGetLiveServer);

module.exports = hermesRouter;
