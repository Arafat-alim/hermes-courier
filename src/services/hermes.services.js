const axios = require("axios");
const { v4: uuidv4 } = require("uuid"); // Import the uuid package
const config = require("../../config");

class HermesServices {
  static COLORS = {
    DEFAULT: 3447003,
    SUCCESS: 3066993,
    WARNING: 16776960,
    DANGER: 15158332,
    INFO: 3447003,
    MAINTENANCE: 10181046,
    DEBUG: 7419530,
  };

  static SEVERITY = {
    INFO: "info",
    WARNING: "warning",
    ERROR: "error",
    CRITICAL: "critical",
    DEBUG: "debug",
  };

  static async sendDataToWebhook({
    jsonData = {},
    severity = HermesServices.SEVERITY.INFO,
    color = HermesServices.COLORS.DEFAULT,
    webhookUrl = config.discord.defaultWebhookUrl,
    title,
    avatar,
    footerText,
    extraMetadata = {},
    content = "",
  }) {
    try {
      const appName = config.app.name;
      const timestamp = new Date().toISOString();
      const uuid = uuidv4(); // Generate a unique UUID for this request
      const metadata =
        Object.keys(extraMetadata).length === 0 ? false : extraMetadata;

      let prettified = `\`\`\`json\n${JSON.stringify(
        jsonData,
        null,
        2
      )}\n\`\`\``;

      const payload = {
        embeds: [
          {
            title:
              `${title}:${uuid}` || `New Notification from ${appName}:${uuid}`,
            avatar_url: avatar,
            content: content || "Knock Knock",
            description: prettified || {},
            color: color,
            footer: {
              text: footerText || `Powered by ${appName}`,
              icon_url: avatar,
            },
            severity: severity,
            timestamp: timestamp,
            fields: metadata
              ? [
                  {
                    name: "Additional Info",
                    value: JSON.stringify(extraMetadata, null, 2),
                    inline: false,
                  },
                ]
              : null,
            uuid: uuid, // Include the UUID in the payload
          },
        ],
      };

      const response = await axios.post(webhookUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Debugging log
      console.log("Successfully sent data to webhook:", response.data);

      // Return UUID along with response data for tracking
      return { responseData: response.data, uuid };
    } catch (error) {
      // Log the error for debugging
      console.error("Error while sending data to webhook", error);
      throw new Error(`Webhook Error: ${error.message}`);
    }
  }
}

module.exports = {
  HermesServices,
};
