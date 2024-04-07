import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

export class ChatService {
  #userService = diContainer.resolve(SERVICES.users);
  #chats = new Map();

  createChat({ sessionId, participants }) {
    const chatId = new Date();
    this.#chats.set(chatId, participants);
  }

  getChat(id) {
    return this.#chats.get(id);
  }
}
