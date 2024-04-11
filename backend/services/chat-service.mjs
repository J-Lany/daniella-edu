import { v4 as uuidv4 } from "uuid";
import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";

export class ChatService {
  #chatsDao = diContainer.resolve(SERVICES.chatsDao);

  async createChat(authorId, participantsIds) {
    if (authorId === null) {
      throw new Error(401);
    }
    const chatId = uuidv4();
    const date = new Date();
    const newChat = { chatId, participantsIds, date };
    await this.#chatsDao.setChat(newChat, authorId);

    return chatId;
  }

  async getChatsByAythor(authorId) {
    return await this.#chatsDao.getChatsByAuthor(authorId);
  }

  deleteParticipants(authorId, chatId, toDeleteParticipateId) {
    this.#chatsDao.deleteChatParticipants(
      authorId,
      chatId,
      toDeleteParticipateId
    );
  }

  async deleteChat(authorId, deleteChatId) {
    await this.#chatsDao.deleteChat(authorId, deleteChatId);
  }
}
