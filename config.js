module.exports = {
  AUTH_INFO: 'auth_info',
  ALLOWED_CHAT_IDS: JSON.parse(process.env.ALLOWED_CHAT_IDS.toString().trim()),
  BOT_PREFIX: `*${process.env.BOT_PREFIX}*`,

  LLM: {
    API_URI: process.env.LLM_API_URI,
    API_KEY: process.env.LLM_API_KEY,
    MODEL: process.env.LLM_MODEL,
    TEMPERATURE: process.env.LLM_TEMPERATURE,
    MAX_TOKENS: process.env.LLM_MAX_TOKENS,

    PROMPT_SYSTEM: 'Eres un chatbot en whatsapp que responde de forma breve a los mensajes de los usuarios.',
    PROMPT_USER: 'User: ',
  }
};