import { v4 as uuidv4 } from "uuid";
import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";
import { paginator } from "../utils/paginator.mjs";

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

  async getChatsByAythor(authorId, chatsPerPage, pageNumber) {
    const chatsList = await this.#chatsDao.getChatsByAuthor(authorId);
    return paginator(chatsPerPage, pageNumber, chatsList);
  }

  async deleteParticipants(authorId, chatId, toDeleteParticipateId) {
    await this.#chatsDao.deleteChatParticipants(
      authorId,
      chatId,
      toDeleteParticipateId
    );
  }

  async deleteChat(authorId, deleteChatId) {
    await this.#chatsDao.deleteChat(authorId, deleteChatId);
  }

  async setParticipants(authorId, chatId, participantsId) {
    const result = await this.#chatsDao.setParticipants(
      authorId,
      chatId,
      participantsId
    );
    if (!result) {
      throw new Error(500);
    }
  }
}
