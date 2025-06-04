/*  
 * this code was created with assistance from chatgpt  
 * feature logic developed by kyuurzy
 */

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const config = require("../config");

module.exports = (client) => {
    const pluginsPath = path.join(__dirname, "../plugins");
    const pluginFiles = fs.readdirSync(pluginsPath).filter(file => file.endsWith(".js"));
    const commands = {};

    pluginFiles.forEach(file => {
        const plugin = require(path.join(pluginsPath, file));
        if (typeof plugin === "function") {
            console.error(`❌ Plugin ${file} tidak memiliki format yang benar!`);
            return;
        }

        if (!plugin.command) {
            console.error(`❌ Plugin ${file} tidak memiliki 'command'.`);
            return;
        }

        plugin.command.forEach(cmd => {
            commands[cmd] = plugin;
        });
        console.log(`✅ Plugin ${file} dimuat.`);
    });

    client.addEventHandler(async (event) => {
        const message = event.message;
        if (!message || !message.message) return;

        let senderId = message.senderId || "Unknown";

        console.log(chalk.bgHex("#e74c3c").bold(`▢ New Message`));
        console.log(
            chalk.bgHex("#00FF00").black(
                `   ⌬ Tanggal: ${new Date().toLocaleString()} \n` +
                `   ⌬ Pesan: ${message.message} \n` +
                `   ⌬ ID Telegram: ${senderId}`
            )
        );
        console.log();

        let args = message.message.trim().split(/\s+/);
        let command = args.shift().toLowerCase();
        let text = args.join(" ");

        const handler = commands[command];
        if (!handler) return;

        if (handler.owner && parseInt(senderId) !== parseInt(config.ownerId)) {
            return client.sendMessage(message.peerId, {
                message: "access denied, you are not the owner",
                replyTo: message.id
            });
        }

        await handler.run({
            client,
            text,
            reply: (msg) => client.sendMessage(message.peerId, { 
                message: msg, 
                replyTo: message.id 
            }),
            message
        });
    });
};