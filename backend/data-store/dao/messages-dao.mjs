import { SERVICES } from "../../di/api.mjs";
import { diContainer } from "../../di/di.mjs";
import { FILE_PATHS } from "../../utils/data-file-paths.mjs";

export class MessagessDao {
  #filePath = FILE_PATHS.messages;
  #storeServise = diContainer.resolve(SERVICES.store);

  async getMessagesByChat(chatId) {
    const messages = await this.#storeServise.getData(this.#filePath);
    return messages[chatId];
  }

  async addMessage(chatId, { authorId, messageId, createDate, messageBody }) {
    const messages = await this.#storeServise.getData(this.#filePath);
    if (!messages[chatId]) return null;

    messages[chatId].push({
      authorId,
      chatId,
      messageId,
      createDate,
      messageBody,
    });

    this.#storeServise.setData(this.#filePath, messages);

    return messages[chatId];
  }

  async updateMessage(chatId, messageId, messageBody) {
    const messages = await this.#storeServise.getData(this.#filePath);

    if (!messages[chatId]) return null;

    messages[chatId].forEach((message) => {
      if (message.messageId === messageId) {
        message.messageBody = messageBody;
      }
    });

    this.#storeServise.setData(this.#filePath, messages);

    return { messageId, messageBody };
  }

  async deleteMessage(chatId, messageId) {
    const messages = await this.#storeServise.getData(this.#filePath);
    messages[chatId] = messages[chatId].filter(
      (message) => message.messageId !== messageId
    );
    this.#storeServise.setData(this.#filePath, messages);
  }
}
