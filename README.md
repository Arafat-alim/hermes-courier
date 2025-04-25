# **API Documentation for Hermes-Courier: Notification Service**

---

## **Version 1.0.0**

### **Base URL**

`http://localhost:8811/api/v1`

---

## **API Endpoints**

### **1. POST /send**

Send a notification message to Discord via webhook.

#### **Request**

- **URL:** `/send`
- **Method:** `POST`
- **Authentication:** None (Use the provided webhook URL in the request body)

#### **Request Body (JSON)**

| Field           | Type     | Description                                                                                                                    | Required | Example Value                                       |
| --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ | -------- | --------------------------------------------------- |
| `avatar_url`    | `string` | Avatar URL to display on the notification                                                                                      | Optional | `https://someimageurl.com/avatar.jpg`               |
| `title`         | `string` | Title of the notification message                                                                                              | Optional | `System Alert: New Notification`                    |
| `jsonData`      | `object` | JSON data to be included in the notification description (formatted as JSON)                                                   | Required | `{"event": "maintenance", "status": "in-progress"}` |
| `footerText`    | `string` | Footer text displayed in the notification                                                                                      | Optional | `Powered by Hermes Courier`                         |
| `color`         | `string` | The color of the notification embed. Choose from the following: `SUCCESS`, `WARNING`, `DANGER`, `INFO`, `MAINTENANCE`, `DEBUG` | Optional | `SUCCESS`                                           |
| `severity`      | `string` | Severity level of the message. Choose from: `INFO`, `WARNING`, `ERROR`, `CRITICAL`, `DEBUG`                                    | Optional | `INFO`                                              |
| `webhookUrl`    | `string` | Discord webhook URL. If not provided, the default webhook URL from configuration will be used.                                 | Optional | `https://discord.com/api/webhooks/xxxxx/xxxxx`      |
| `extraMetadata` | `object` | Additional metadata to include in the embed fields. It will be displayed as a JSON string.                                     | Optional | `{ "user_id": "12345", "session": "xyz-abc-123" }`  |
| `content`       | `string` | Content (message) of the notification (visible text). If not provided, the default "Knock Knock" will appear.                  | Optional | `System running smoothly.`                          |

#### **Response Body (JSON)**

| Field     | Type      | Description                                                           | Example Value                                |
| --------- | --------- | --------------------------------------------------------------------- | -------------------------------------------- |
| `success` | `boolean` | Status of the API call                                                | `true`                                       |
| `message` | `string`  | Message indicating the status of the notification                     | `Notification sent to Discord successfully!` |
| `id`      | `string`  | The UUID generated for this notification request, useful for tracking | `b0548b4d-7f5c-4d2e-96f7-099f1cb40b8c`       |
| `error`   | `string`  | If the request failed, the error message                              | `Webhook Error: Invalid webhook URL`         |

#### **Response Example**

##### **Success Response:**

```json
{
  "success": true,
  "message": "Notification sent to Discord successfully!",
  "id": "b0548b4d-7f5c-4d2e-96f7-099f1cb40b8c"
}
```

##### **Error Response:**

```json
{
  "success": false,
  "message": "Failed to send message",
  "error": "Webhook Error: Invalid webhook URL"
}
```

---

### **2. GET /**

#### **Request**

- **URL:** `/`
- **Method:** `GET`
- **Authentication:** None

#### **Response (JSON)**

| Field     | Type      | Description                                      | Example Value                                |
| --------- | --------- | ------------------------------------------------ | -------------------------------------------- |
| `success` | `boolean` | Status of the request                            | `true`                                       |
| `message` | `string`  | A message confirming the server's running status | `Server is running at http://localhost:8811` |

#### **Response Example**

```json
{
  "success": true,
  "message": "Server is running at http://localhost:8811"
}
```

---

## **Error Handling**

All errors are handled with appropriate HTTP status codes and error messages.

| Error Code | Description                     | Example                                  |
| ---------- | ------------------------------- | ---------------------------------------- |
| 400        | Bad Request - Validation failed | `Validation errors in the request body.` |
| 500        | Internal Server Error           | `Failed to send message`                 |

---

## **Webhook Payload Structure (Discord Embed)**

When sending data to the webhook, the API will create a Discord message with the following embed structure:

````json
{
  "embeds": [
    {
      "title": "Notification Title: b0548b4d-7f5c-4d2e-96f7-099f1cb40b8c",
      "avatar_url": "https://someimageurl.com/avatar.jpg",
      "content": "System running smoothly.",
      "description": "```json\n{\"event\":\"maintenance\",\"status\":\"in-progress\"}\n```",
      "color": 3066993,
      "footer": {
        "text": "Powered by Hermes Courier",
        "icon_url": "https://someimageurl.com/avatar.jpg"
      },
      "severity": "info",
      "timestamp": "2023-10-24T10:10:10.000Z",
      "uuid": "b0548b4d-7f5c-4d2e-96f7-099f1cb40b8c",
      "fields": [
        {
          "name": "Additional Info",
          "value": "{\"user_id\":\"12345\",\"session\":\"xyz-abc-123\"}",
          "inline": false
        }
      ]
    }
  ]
}
````

### Postman Body

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

### Postman response

```
{
    "success": true,
    "message": "Notification sent to Discord successfully!",
    "id": "f3f87ea6-914b-437c-850a-052c01122a86"
}

```

---

## **Technologies Used**

- **Express** - Backend framework for routing.
- **Axios** - HTTP client used to send requests to Discord.
- **uuid** - UUID library for generating unique identifiers.
- **Discord Webhooks** - Service to send messages directly to Discord channels.

---

## **Changelog**

- **1.0.0** - Initial release.

---

## **Run the Application Locally**

To run this application locally, follow these steps:

1. **Clone the repository**:

```bash
git clone https://github.com/Arafat-alim/hermes-courier.git
```

2. **Install dependencies**:

```bash
cd hermes-courier
npm install
```

3. **Set up environment variables**:

Copy `.env.example` to `.env` and set up your Discord webhook URL and any other necessary configuration.

```bash
cp .env.example .env
```

4. **Start the server**:

```bash
npm run dev
```

The application will be running on `http://localhost:8811`.

---

### **Contribution Guidelines**

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/xyz`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/xyz`).
5. Create a new Pull Request.

---

### **License**

ISC License - see the [LICENSE](LICENSE) file for details.

---

## **Additional Notes**

- All requests to `/send` will use Discord's webhook to post messages. Ensure that the provided webhook URL is valid and active.
- The `uuid` in the response and the webhook payload helps track the notification and correlate logs or troubleshooting efforts.

---

By using **Hermes-Courier**, you can seamlessly send structured, dynamic notifications to your Discord channels, enhancing visibility into your system events.

---

This is your **OpenAPI 3.0** style documentation for the `/send` API. It's clear, robust, and designed to scale as you add more features and integrations to the Hermes-Courier service.
