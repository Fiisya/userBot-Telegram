/*  
 * this code was created with assistance from chatgpt  
 * feature logic developed by kyuurzy
 */
 
 // Fixed by AlfiXD
 
const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
    command: ["play"],
    run: async ({ client, text, reply, message }) => {
        if (!text) return reply("Contoh: play runtuh");

        reply("🔍 Sedang mencari lagu...");

        try {
            // Step 1: Search video
            const searchRes = await axios.get(`https://api.alfixd.my.id/api/ytsearch?q=${encodeURIComponent(text)}`);
            const searchData = searchRes.data;

            if (!searchData.status || searchData.result.length === 0) {
                return reply("🚫 Lagu tidak ditemukan.");
            }

            const firstResult = searchData.result[0];
            const videoUrl = firstResult.url;

            // Step 2: Download audio
            reply(`🎧 Mengunduh audio dari: ${firstResult.title}`);
            const downloadRes = await axios.get(`https://api.alfixd.my.id/api/ytdl?url=${encodeURIComponent(videoUrl)}&format=mp3`);
            const downloadData = downloadRes.data;

            if (!downloadData.status) {
                return reply("🚫 Gagal mengunduh audio.");
            }

            const audioUrl = downloadData.result.download_url;
            const audioTitle = downloadData.result.title;

            // Step 3: Download the audio file
            const audioPath = path.resolve(__dirname, `../temp/${audioTitle}.mp3`);
            const audioFile = await axios.get(audioUrl, { responseType: 'arraybuffer' });
            fs.writeFileSync(audioPath, audioFile.data);

            // Step 4: Send audio to user
            await client.sendMessage(message.peerId, {
                message: `🎶 Memutar: *${audioTitle}*`,
                file: audioPath,
                caption: `🎵 Lagu: *${audioTitle}*`,
                replyTo: message.id
            });

            // Clean up
            fs.unlinkSync(audioPath);
        } catch (error) {
            console.error(error);
            reply("🚫 Terjadi kesalahan saat memproses permintaan.");
        }
    },
};
