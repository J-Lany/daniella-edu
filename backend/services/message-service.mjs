import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";
import { v4 as uuidv4 } from "uuid";
import { paginator } from "../utils/paginator.mjs";

export class MessageService {
  #messagesDao = diContainer.resolve(SERVICES.messagesDao);
  #chatsDao = diContainer.resolve(SERVICES.chatsDao);

  async getMessagesByChat(chatId, messagesPerPage, pageNumber) {
    const messagesList = await this.#messagesDao.getMessagesByChat(chatId);
    return paginator(messagesPerPage, pageNumber, messagesList);
  }

  async addMessage(authorId, chatId, messageBody) {
    const isPatrtisipant = await this.isPatrtisipant(authorId);
    if (!isPatrtisipant) throw new Error(403);

    const messageId = uuidv4();
    const createDate = new Date();

    const result = await this.#messagesDao.addMessage(chatId, {
      authorId,
      messageId,
      createDate,
      messageBody,
    });
    if (!result) {
      throw new Error(500);
    }
    return result;
  }

  async updateMessage(chatId, messageId, messageBody) {
    const isPatrtisipant = await this.isPatrtisipant(authorId);
    if (!isPatrtisipant) throw new Error(403);

    const result = await this.#messagesDao.updateMessage(
      chatId,
      messageId,
      messageBody
    );
    if (!result) {
      throw new Error(500);
    }
    return;
  }

  async deleteMessage(chatId, messageId) {
    try {
      const isPatrtisipant = await this.isPatrtisipant(authorId);
      if (!isPatrtisipant) throw new Error(403);
      await this.#messagesDao.deleteMessage(chatId, messageId);
    } catch {
      throw new Error(500);
    }
  }

  async isPatrtisipant(authorId) {
    const chats = await this.#chatsDao.getChatsByAuthor(authorId);
    if (!chats) return false;

    const isPatrtisipant = chats.find((chat) =>
      chat.participantsIds.includes(authorId)
    );
    if (!isPatrtisipant) return false;

    return true;
  }
}
