import OpenAI from "openai";
import { Bot } from "grammy"
import dotenv from "dotenv";

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN);

const token = process.env.API_TOKEN;
const endpoint = "https://models.github.ai/inference";
const modelName = "openai/gpt-4o";


// Handle the /start command
bot.command("start", async (ctx) => {
    await ctx.reply("ወደ አማርኛ ቋንቋ ተርጓሚ ቦት። ቃላቶትን ወይም አረፍተ ነገሮትን ያስገቡበት")
});

// handle messages
bot.on("message:text", async (ctx) => {

    try {

        const client = new OpenAI({
            baseURL: endpoint,
            apiKey: token
        });

        const response = await client.chat.completions.create({
            messages: [
                { role: "system", content: "You are a good Amharic language translator." },
                { role: "user", content: `Translate this language into the Amharic language: ${ctx.message.text}` }
            ],
            model: modelName,
            temperature: 1,
            max_tokens: 4096,
            top_p: 1
        });

        await ctx.reply(response.choices[0].message.content)
    } catch (error) {
        console.error("The Bot encountered an error: ", error);
    }


});

bot.start({
    drop_pending_updates: true
});
console.log("Bot starting");


