const { useMultiFileAuthState, makeWASocket } = require('baileys');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

async function connectToWhatsApp() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
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
  } catch (err) {
    console.error('Error al conectar:', err);
    setTimeout(connectToWhatsApp, 5000);
  }
}

connectToWhatsApp();