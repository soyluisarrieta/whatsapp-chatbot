# WhatsApp ChatBot

🌐 English | [**Español**](./README-ES.md)

This chatbot, developed in Node.js and using the [Baileys](https://github.com/WhiskeySockets/Baileys) library, acts as an intermediary between WhatsApp and your API. It is agnostic to any LLM service. Ideal for custom integrations and automations without usage restrictions.

## TODO-LIST

- [x] Generate connection QR
- [x] Link WhatsApp account
- [x] Save credentials
- [x] Automatic reconnection
- [x] Send and receive WhatsApp messages
- [x] Differentiate between bot and user messages
- [x] Integrate LLM to respond to messages
- [ ] Support for message replies
- [ ] Logger for messages, responses, and errors
- [ ] Redirect commands to an API via HTTP

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/whatsapp-chatbot.git
    cd whatsapp-chatbot
    ```

2. Create a `.env` file and set the required environment variables:

    ```bash
    cp .env.example .env
    ```

3. Install dependencies (you can use Bun or NPM):

    ```bash
    bun install
    ```

4. Start the chatbot:

    ```bash
    bun start
    ```

5. Open your WhatsApp app and scan the generated QR code.

6. Once connected, you can start sending and receiving messages.

7. If you are having trouble with LLM fetching, modify the service according to your provider:

    ```js
    // src/services/llm.service.js

    const response = await fetch(LLM.API_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LLM.API_KEY}`
      },
      body: JSON.stringify({
        // Modify this object
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Bad Request');
    }

    // Modify the following line
    return data.choices[0].message.content.trim();
    ```
