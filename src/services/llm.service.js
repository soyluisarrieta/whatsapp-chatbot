const { LLM } = require('../config');

async function fetchLLM(message) {
  try {
    const response = await fetch(LLM.API_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LLM.API_KEY}`
      },
      body: JSON.stringify({
        model: LLM.MODEL,
        messages: [
          { role: 'system', content: LLM.PROMPT_SYSTEM },
          { role: 'user', content: LLM.PROMPT_USER + message },
        ],
        max_tokens: LLM.MAX_TOKENS,
        temperature: LLM.TEMPERATURE
      })
    });    

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Bad Request');
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('❌ Error al obtener respuesta del LLM:', error);
    return 'Lo siento, hubo un error al procesar tu mensaje.';
  }
}

module.exports = { fetchLLM };