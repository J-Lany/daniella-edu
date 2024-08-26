import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

export async function wsChatController(chat, ws, clients) {
  const chatService = diContainer.resolve(SERVICES.chat);

  try {
    const chatId = await chatService.createChat(chat.authorId, chat.participantsIds, chat.chatType);

    if (!chatId) {
      console.log(`Chat was not saved`);
      return;
    }

    for (let userId of chat.participantsIds) {
      const client = clients.get(userId);
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(chat);
      }
    }
  } catch (err) {
    console.log(`Error handling message: ${err}`);
  }
}
