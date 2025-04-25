const { body } = require("express-validator");

const webhookValidation = [
  body("webhookUrl").optional().isURL().withMessage("Invalid webhook URL"),
  body("title").optional().isString().trim().isLength({ max: 256 }),
  body("message").optional().isString().trim(),
  body("color")
    .optional()
    .isInt()
    .withMessage("Color must be a decimal number"),
  body("severity")
    .optional()
    .isIn(["info", "warning", "error", "critical", "debug"]),
  body("metadata").optional().isObject(),
];

module.exports = {
  webhookValidation,
};
