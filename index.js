 /*  
 * this code was created with assistance from chatgpt  
 * feature logic developed by kyuurzy
 */

const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fs = require("fs");
const input = require("input");
const config = require("./config");
const loadPlugins = require("./utils/loader");

let sessionString = fs.existsSync(config.sessionFile) ? fs.readFileSync(config.sessionFile, "utf8") : "";
const session = new StringSession(sessionString);

async function main() {
    console.log("🚀 Memulai Userbot Telegram...");

    const client = new TelegramClient(session, config.apiId, config.apiHash, { 
    connectionRetries: 5 
    });

    await client.start({
        phoneNumber: async () => await input.text("📲 Masukkan nomor Telegram Anda: "),
        password: async () => await input.text("🔑 Masukkan password akun Telegram (jika ada): "),
        phoneCode: async () => await input.text("📩 Masukkan kode OTP: "),
        onError: (err) => console.log("❌ Error: ", err),
    });

    console.log("✅ Login berhasil!");
    fs.writeFileSync(config.sessionFile, client.session.save(), "utf8");
    await client.sendMessage("me", { message: "✅ Userbot berhasil login dan tersimpan!" });
    console.log("🤖 Userbot siap digunakan!");
    loadPlugins(client);
}

main();