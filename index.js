const config = require("./config.json")
const TelegramBot = require('node-telegram-bot-api');
const { Client, GatewayIntentBits } = require('discord.js');


const token = config.TELEGRAM_BOT_TOKEN;
const discordToken = config.DISCORD_BOT_TOKEN;
const discordChannelId = config.DISCORD_CHANNEL_ID;

const telegramBot = new TelegramBot(token, { polling: true });
const discordBot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], });

telegramBot.on('message', (msg) => {
    const messageText = msg.text;

    if (msg.from.username === 'DiscordMessageBridgeBot' || !messageText) {
        return;
    }
    const discordChannel = discordBot.channels.cache.get(discordChannelId);
    if (discordChannel) {
        discordChannel.send(`[${msg.from.username}] ${messageText}`);
    }
});

discordBot.on('messageCreate', (message) => {
    if (message.channelId != config.DISCORD_CHANNEL_ID)
        return console.log("Farklı kanal!");
    console.log("Message Content: " + message.content)
    if (message.author.bot || !message.content) {
        return;
    }
    telegramBot.sendMessage(config.TELEGRAM_GROUP_CHAT_ID, `[${message.author.username}] ${message.content}`);
});

telegramBot.on('error', (error) => {
    console.error(error);
});

discordBot.login(discordToken);
