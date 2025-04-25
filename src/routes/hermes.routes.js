const express = require("express");
const {
  handleDiscordSendMessageV2,
  handleTestLiveServer,
} = require("../controller/hermes.controller");
const { body } = require("express-validator");

const hermesRouter = express.Router();

const webhookValidation = [
  body("username").optional().isString().trim(),
  body("content").optional().isString().trim(),
  body("avatar_url").optional().isString().trim(),
  body("webhookUrl").optional().isURL().withMessage("Invalid webhook URL"),
  body("title").optional().isString().trim().isLength({ max: 256 }),
  body("message").optional().isString().trim(),
  body("color")
    .toUpperCase()
    .optional()
    .isIn(["SUCCESS", "WARNING", "DANGER", "INFO", "MAINTENANCE", "DEBUG"]),
  body("severity")
    .toUpperCase()
    .optional()
    .isIn(["INFO", "WARNING", "ERROR", "CRITICAL", "DEBUG"]),
  body("metadata").optional().isObject(),
];

hermesRouter.get("/", handleTestLiveServer);
hermesRouter.post("/send", webhookValidation, handleDiscordSendMessageV2);

module.exports = hermesRouter;
