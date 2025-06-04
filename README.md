# Getting API ID and API Hash for Telegram Bot

To use Telegram's API and run your bot, you need to obtain an **API ID** and **API Hash** from Telegram. Follow the steps below to get them:

## Steps to Get API ID and API Hash

1. **Go to Telegram Developer Portal**  
   - Open [https://my.telegram.org](https://my.telegram.org) in your browser.

2. **Log in to Your Telegram Account**  
   - Enter your phone number and verify it using the code sent via Telegram.

3. **Create a New Application**  
   - Click on **"Create New Application"**.
   - Fill in the required details:
     - **App title**: Choose any name for your app.
     - **Short name**: Enter a short identifier for your app.
     - **Platform**: Select the platform (Android, iOS, Web, etc.).
     - **Description**: (Optional) Describe your app.

4. **Get API Credentials**  
   - After submitting the form, you will see:
     - **API ID** (a numeric ID).
     - **API Hash** (a long alphanumeric string).

5. **Use API ID and API Hash**  
   - Save these credentials securely.
   - Use them in your bot configuration to authenticate with Telegram's API.

## Example Configuration
```js
module.exports = {
    apiId: "YOUR_API_ID",
    apiHash: "YOUR_API_HASH"
};
