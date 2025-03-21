require('dotenv').config();
const { AUTH_INFO, ALLOWED_CHAT_IDS, BOT_PREFIX } = require('./config');
const { useMultiFileAuthState, makeWASocket } = require('baileys');
const qrcode = require('qrcode-terminal');

async function connectToWhatsApp() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_INFO);
    const sock = makeWASocket({
      auth: state,
      printQRInTerminal: true,
    });

    // Escuchar cambios de conexión
    sock.ev.on('connection.update', (update) => {
      const { qr, connection } = update;

      // Mostrar el código QR
      if (qr) {
        qrcode.generate(qr, { small: true });
        console.log('Escanea el código QR con tu teléfono para conectarte.');
      }

      // Reconectar
      if (connection === 'open') {
        console.log('Conexión exitosa!');
      }

      // Reconectar
      if (connection === 'close') {
        console.log('Conexión cerrada. Reconectando...');
        connectToWhatsApp();
      }
    });

    // Guardar credenciales
    sock.ev.on('creds.update', saveCreds);

    // Escuchar mensajes
    sock.ev.on('messages.upsert', async (m) => {
      const chunk = m.messages[0];

      // Proviene de ALLOWED_CHAT_IDS
      if (!ALLOWED_CHAT_IDS.includes(chunk.key.remoteJid)) {
        console.log('Mensaje ignorado (no es del chat permitido).');
        return;
      }

      // Extraer el texto del mensaje
      const message =
        chunk.message.conversation ||
        chunk.message?.extendedTextMessage?.text ||
        "";

      // Mensaje es del bot
      if (message.startsWith(BOT_PREFIX) || !message) {
        console.log('Mensaje ignorado.');
        return;
      }

      // Mensaje es vacío
      if (!message) {
        console.log('Mensaje ignorado (vacio).');
        return;
      }

      // Enviar el mensaje de respuesta
      const reply = `${BOT_PREFIX}\nHola, recibí tu mensaje "${message}"`;
      await sock.sendMessage(chunk.key.remoteJid, { text: reply });
      console.log('Mensaje enviado por el bot:', reply);
    });

  } catch (err) {
    console.error('Error al conectar:', err);
    setTimeout(connectToWhatsApp, 5000);
  }
}

// Iniciar conexión de WhatsApp
connectToWhatsApp();