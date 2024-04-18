import { SERVICES } from "../di/api.mjs";
import { diContainer } from "../di/di.mjs";
import { v4 as uuidv4 } from "uuid";

export class MessageService {
  #messagesDao = diContainer.resolve(SERVICES.messagesDao);

  async getMessagesByChat(chatId) {
    //Добавить пагинацию после мерджа задачи
    return await this.#messagesDao.getMessagesByChat(chatId);
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

  async updateMessage(chatId, messageId, updates) {
    const result = await this.#messagesDao.updateMessage(
      chatId,
      messageId,
      updates
    );
    if (!result) {
      throw new Error(500);
    }
    return;
  }
}
