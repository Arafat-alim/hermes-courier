require("dotenv").config();

module.exports = {
  app: {
    name: process.env.APP_NAME || "Hermes-Courier",
    version: process.env.APP_VERSION || "1.0.0",
    env: process.env.NODE_ENV || "development",
  },
  discord: {
    defaultWebhookUrl: process.env.DISCORD_DEFAULT_WEBHOOK,
    errorWebhookUrl: process.env.DISCORD_ERROR_WEBHOOK,
    healthWebhookUrl: process.env.DISCORD_HEALTH_WEBHOOK,
    rateLimit: parseInt(process.env.DISCORD_RATE_LIMIT) || 50,
  },
};
