const config = require("./config.json")
const TelegramBot = require('node-telegram-bot-api');

const token = config.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (msg.from.username.toString === 'DiscordMessageBridgeBot' || !messageText) {
    return;
  }
  bot.sendMessage(chatId, messageText);
});

bot.on('polling_error', (error) => {
  console.error(error);
});
