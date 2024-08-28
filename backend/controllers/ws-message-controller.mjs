import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

export async function wsMessageController(message, ws, clients) {
  const messageService = diContainer.resolve(SERVICES.messages);
  const chatService = diContainer.resolve(SERVICES.chat);

  try {
    const { authorId, chatId, messageBody } = message;
    const messageId = await messageService.addMessage(authorId, chatId, messageBody);

    if (!messageId) {
      console.log(`Message was not saved, it can't be sent to chat users.`);
      return;
    }

    const chatUsers = await chatService.getParticipants(chatId);

    for (let userId of chatUsers) {
      const client = clients.get(userId);
      console.log(message)
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  } catch (err) {
    console.log(`Error handling message: ${err}`);
  }
}


