import { Bot, webhookCallback } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN);

// Handle the /start command
bot.command("start", async (ctx) => {
    await ctx.reply("ወደ አማርኛ ቋንቋ ተርጓሚ ቦት። ቃላቶትን ወይም አረፍተ ነገሮትን ያስገቡበት")
});

export default webhookCallback(bot, "http");