# WhatsApp ChatBot

🌐 [**English**](./README-ES.md) | Español

Este chatbot, desarrollado en Node.js y utilizando la librería [Baileys](https://github.com/WhiskeySockets/Baileys), funciona como un intermediario entre WhatsApp y tu API. Es agnóstico a cualquier servicio LLM. Ideal para integraciones personalizadas y automatizaciones sin restricciones de uso.

## TODO-LIST

- [x] Generar QR de conexión
- [x] Vincular cuenta de WhatsApp
- [x] Guardar credenciales
- [x] Reconexión automática
- [x] Enviar y recibir mensajes de WhatsApp
- [x] Diferenciar entre mensajes de bot y de usuario
- [x] Integrar LLM para responder a mensajes
- [ ] Soporte para respuestas de mensajes
- [ ] Logger de mensajes, respuestas y errores
- [ ] Redirigir comandos a una API via HTTP

## Empezar

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/whatsapp-chatbot.git
    cd whatsapp-chatbot
    ```

2. Crea un archivo `.env` y configura las variables de entorno necesarias:

    ```bash
    cp .env.example .env
    ```

3. Instala las dependencias (puedes usar Bun o NPM):

    ```bash
    bun install
    ```

4. Inicia el chatbot:

    ```bash
    bun start
    ```

5. Abre tu aplicación de WhatsApp y escanea el código QR generado.

6. Una vez conectado, podrás empezar a enviar y recibir mensajes.

7. Si tienes problemas con la respuesta del LLM, modifica el servicio según tu proveedor:

    ```js
    // src/services/llm.service.js

    const response = await fetch(LLM.API_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LLM.API_KEY}`
      },
      body: JSON.stringify({
        // Modifica este objeto
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Solicitud incorrecta');
    }

    // Modifica la siguiente línea
    return data.choices[0].message.content.trim();
    ```
