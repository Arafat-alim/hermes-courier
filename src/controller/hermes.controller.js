const { validationResult } = require("express-validator");
const config = require("../../config");
const { HermesServices } = require("../services/hermes.services");

const handleTestLiveServer = async (req, res) => {
  const baseUrl = process.env.BASE_URL;
  const port = process.env.PORT;
  return res.status(200).json({
    success: true,
    message: `Server is running at ${baseUrl}:${port}`,
  });
};

const handleDiscordSendMessageV2 = async (req, res) => {
  const {
    avatar_url,
    title,
    jsonData,
    footerText,
    color,
    severity,
    webhookUrl,
    extraMetadata = {},
    content = "",
  } = req.body;

  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const colorCode =
    HermesServices.COLORS[color.toUpperCase()] || HermesServices.COLORS.DEFAULT;
  const severityLevel =
    HermesServices.SEVERITY[severity.toUpperCase()] ||
    HermesServices.SEVERITY.INFO;

  try {
    const response = await HermesServices.sendDataToWebhook({
      jsonData,
      severity: severityLevel,
      color: colorCode,
      title,
      avatar: avatar_url,
      footerText,
      webhookUrl: webhookUrl || config.discord.defaultWebhookUrl,
      extraMetadata,
      content,
    });

    console.log("Successfully sent message to Discord:", response);
    res.status(200).json({
      success: true,
      message: "Notification sent to Discord successfully!",
      id: response.uuid,
    });
  } catch (err) {
    console.error("Failed to send message:", err);
    return res.status(err.status || 500).json({
      success: false,
      message: "Failed to send message",
      error: err.message,
    });
  }
};

module.exports = { handleDiscordSendMessageV2, handleTestLiveServer };
