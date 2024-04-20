import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";
import { v4 as uuidv4 } from "uuid";
import { paginator } from "../utils/paginator.mjs";

export class MessageService {
  #messagesDao = diContainer.resolve(SERVICES.messagesDao);

  async getMessagesByChat(chatId, messagesPerPage, pageNumber) {
    const messagesList = await this.#messagesDao.getMessagesByChat(chatId);
    return paginator(messagesPerPage, pageNumber, messagesList);
  }

  async addMessage(authorId, chatId, messageBody) {
    const messageId = uuidv4();
    const createDate = new Date();
    await this.#messagesDao.addMessage(chatId, {
      authorId,
      messageId,
      createDate,
      messageBody,
    });
    return messageId;
  }

  async updateMessage(chatId, messageId, messageBody) {
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
      await this.#messagesDao.deleteMessage(chatId, messageId);
    } catch {
      throw new Error(500);
    }
  }
}
