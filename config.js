module.exports = {
  AUTH_INFO: 'auth_info',
  ALLOWED_CHAT_IDS: JSON.parse(process.env.ALLOWED_CHAT_IDS.toString().trim()),
  BOT_PREFIX: process.env.BOT_PREFIX
};