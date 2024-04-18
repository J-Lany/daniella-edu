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

  async addMessage(chatId, message) {
    const messages = await this.#storeServise.getData(this.#filePath);
    if (!messages[chatId]) {
      messages[chatId] = [message];
    } else {
      messages[chatId].push(message);
    }
    this.#storeServise.setData(this.#filePath, messages);
  }

  async updateMessage(chatId, messageId, updates) {
    const messages = await this.#storeServise.getData(this.#filePath);
    let currentMessage = messages[chatId].find(
      (message) => message.messageId === messageId
    );
    if (currentMessage === undefined) {
      return null;
    }
    currentMessage = { ...currentMessage, ...updates };

    this.#storeServise.setData(this.#filePath, messages);

    return { messageId, updates };
  }
}
