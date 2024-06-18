import { diContainer } from "../di/di.js";
import { SERVICES } from "../di/api.js";

export class MessageService {
  #httpService = diContainer.resolve(SERVICES.http);
  #messagesSubscribers = new Set();
  #messages = new Map();
  #currentChatId;

  subscribeMessagesByCurrentChat(subscribtion) {
    this.#messagesSubscribers.add(subscribtion);
    this.notifySubscribers();
    return () => this.unSubscribe;
  }

  async notifySubscribers() {
    let messages;

    if (this.#currentChatId) {
      messages = this.#messages.has(this.#currentChatId)
        ? this.#messages.get(this.#currentChatId)
        : await this.getMessagesByChatId(this.#currentChatId);
    }

    this.#messagesSubscribers.forEach((subscription) => {
      subscription(messages);
    });
  }

  unSubscribe(subs) {
    this.#messagesSubscribers.delete(subs);
  }

  setCurrentChatId(id) {
    this.#currentChatId = id;
    this.notifySubscribers();
  }

  async getMessagesByChatId(id) {
    const result = await this.#httpService.get(`messages/${id}`);

    if (result.status === 200) {
      this.#messages.set(this.#currentChatId, result.content);
      return result.content;
    }
  }
}
