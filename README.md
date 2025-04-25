### **HermesServices - GitHub README**

Welcome to **HermesServices**! 🚀 This project provides an easy-to-use service for sending notifications via Discord Webhooks. It's designed to be intuitive, flexible, and scalable, making it ideal for both beginner developers and advanced users looking for a straightforward way to send messages with various levels of severity, color-coding, and metadata support.

---

## **Features**

- **Customizable Notifications**: Choose from a variety of options like severity, colors, and metadata.
- **Multiple Platforms Supported**: Can be used in Node.js, React Native (with or without Expo).
- **Clean and Simple**: Developer-friendly, well-documented, and easy to integrate.

---

## **Installation**

To get started, you'll need to install the necessary dependencies.

### **Install via npm:**

```bash
npm install axios
```

---

## **Usage**

Below is how you can use **HermesServices** in different environments.

### **1. Node.js Usage**

In your Node.js application, you can use the `HermesServices` class to send notifications to your Discord webhook.

#### **Setup**

1. First, require the HermesServices module and set up your configuration.

```js
const { HermesServices } = require("./path-to-hermes-services"); // Adjust the path
const config = require("../../config"); // Configuration containing default values like Webhook URLs
```

2. Then, use the `sendDataToWebhook` method to send your custom notifications.

#### **Example Usage in Node.js**

```js
const { HermesServices } = require("./hermesServices"); // Adjust the path
const config = require("../../config"); // Import configuration

// Send a simple info notification to a Discord channel
HermesServices.sendDataToWebhook({
  jsonData: { message: "System is running smoothly!" },
  severity: HermesServices.SEVERITY.INFO,
  color: HermesServices.COLORS.SUCCESS,
  webhookUrl: config.discord.defaultWebhookUrl,
  title: "System Update",
  content: "Everything is operating as expected.",
});
```

---

### **2. React Native (with Expo or not)**

You can easily use **HermesServices** within React Native or React Native Expo applications as well.

#### **1. Setup in React Native (Non-Expo)**

1. Install dependencies:

```bash
npm install axios
```

2. Set up HermesServices:

```js
import { HermesServices } from "./path-to-hermes-services"; // Adjust path to where your HermesServices is stored

const sendNotification = async () => {
  try {
    await HermesServices.sendDataToWebhook({
      jsonData: { message: "A new update is available!" },
      severity: HermesServices.SEVERITY.INFO,
      color: HermesServices.COLORS.INFO,
      webhookUrl: "YOUR_DISCORD_WEBHOOK_URL",
      title: "Update Alert",
      content: "Your app is up to date!",
    });
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
```

#### **2. Setup in React Native (Expo)**

In Expo, it's the same as React Native, but if you're using Expo managed workflow, you’ll need to ensure you have Axios installed.

1. Install dependencies:

```bash
expo install axios
```

2. Set up HermesServices:

```js
import { HermesServices } from "./path-to-hermes-services"; // Adjust path to where your HermesServices is stored

const sendNotification = async () => {
  try {
    await HermesServices.sendDataToWebhook({
      jsonData: { message: "Your device is synced!" },
      severity: HermesServices.SEVERITY.INFO,
      color: HermesServices.COLORS.SUCCESS,
      webhookUrl: "YOUR_DISCORD_WEBHOOK_URL",
      title: "Sync Complete",
      content: "Your app is fully synced with the server!",
    });
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
```

---

## **API Documentation**

Refer to the full **HermesServices** API documentation below for more details on how to customize your notifications.

### **`sendDataToWebhook` method**

#### **Parameters:**

- **`jsonData`**: _(Object)_ — Data you want to send in the notification. Will be displayed in a prettified JSON format in the embed.
- **`severity`**: _(String)_ — Severity of the message. Possible values:
  - `HermesServices.SEVERITY.INFO` (default)
  - `HermesServices.SEVERITY.WARNING`
  - `HermesServices.SEVERITY.ERROR`
  - `HermesServices.SEVERITY.CRITICAL`
  - `HermesServices.SEVERITY.DEBUG`
- **`color`**: _(Number)_ — Embed color. Use one of the predefined constants:
  - `HermesServices.COLORS.DEFAULT`
  - `HermesServices.COLORS.SUCCESS`
  - `HermesServices.COLORS.WARNING`
  - `HermesServices.COLORS.DANGER`
  - `HermesServices.COLORS.INFO`
  - `HermesServices.COLORS.MAINTENANCE`
  - `HermesServices.COLORS.DEBUG`
- **`webhookUrl`**: _(String)_ — The Discord webhook URL to which the notification will be sent. Defaults to the URL in your config.
- **`title`**: _(String)_ — The title of the embed (optional). Defaults to `New Notification from {appName}`.
- **`avatar`**: _(String)_ — The URL of the avatar image for the embed (optional).
- **`footerText`**: _(String)_ — The footer text to be shown in the embed (optional).
- **`extraMetadata`**: _(Object)_ — Extra metadata to add context to the notification (optional).
- **`content`**: _(String)_ — The main content of the message (optional).

```json
{
  "avatar_url": "https://res.cloudinary.com/cocoder/image/upload/v1745600661/Projects/hermes-courier/ffffff_text_Discord_ixqnal.png",
  "title": "User Visit Report",
  "jsonData": {
    "userId": "12345",
    "userName": "john_doe",
    "visitTime": "2025-04-25T12:00:00Z",
    "pageVisited": "/home",
    "browser": "Chrome",
    "location": "USA",
    "device": "Desktop"
  },
  "footerText": "Powered by MyApp",
  "color": "DEBUG",
  "severity": "INFO",
  //   "webhookUrl": "https://discord.com/api/webhooks/1234567890/abcdefg1234567",
  "extraMetadata": {
    "sessionId": "abc123sessionid",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
    "referralSource": "Google"
  }
}
```

#### **Returns**:

- A promise resolving with the response data from the webhook request.

```json
{
  "success": true,
  "message": "Notification sent to Discord successfully!",
  "id": "f3f87ea6-914b-437c-850a-052c01122a86"
}
```

#### **Example**:

```js
HermesServices.sendDataToWebhook({
  jsonData: { message: "This is a debug message" },
  severity: HermesServices.SEVERITY.DEBUG,
  color: HermesServices.COLORS.DEBUG,
  title: "Debug Info",
  footerText: "Debugging Process",
  content: "This is a debug message to help troubleshoot.",
});
```

---

## **Error Handling**

Errors are thrown if the webhook request fails. You can handle errors gracefully with a `try-catch` block.

```js
try {
  await HermesServices.sendDataToWebhook({
    /* options */
  });
} catch (error) {
  console.error("Failed to send notification:", error.message);
}
```

---

## **Configuration**

By default, the webhook URL and other options are stored in a configuration file. Make sure you have a `config` object set up with the necessary values.

### Example **`config.js`**:

```js
module.exports = {
  discord: {
    defaultWebhookUrl: "YOUR_DEFAULT_DISCORD_WEBHOOK_URL",
  },
  app: {
    name: "My Application",
  },
};
```

---

## **Contributing**

We love contributions! Feel free to fork this repo, make changes, and create a pull request. If you have suggestions or find bugs, please open an issue.

---

## **License**

MIT License - See the [LICENSE](LICENSE) file for more details.

---

## **Final Thoughts**

With **HermesServices**, you can effortlessly integrate rich, customizable notifications into your application. Whether you're using **Node.js** or **React Native**, this service is ready to go and can be adapted for a variety of use cases. From monitoring systems to alerting users, you're just a few lines of code away from a better notification system.

Enjoy coding, and stay connected! 🚀
