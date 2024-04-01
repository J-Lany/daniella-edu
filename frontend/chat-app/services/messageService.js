import { diContainer } from "../di/di.js";
import { SERVICES } from "../di/api.js";

const DEFAULT_CHAT_ID = 1;

export class MessageService {
  #httpService = diContainer.resolve(SERVICES.http);
  #messagesSubscribers = new Set();
  #messagesByCurrentChat;
  #currentChatId;

   subscribeMessagesByCurrentChat(subscribtion) {
    this.#messagesSubscribers.add(subscribtion);
    return () => this.unSubscribe;
  }

  notifySubscribers() {
    this.#messagesSubscribers.forEach((subscription) => {
      subscription(this.#messagesByCurrentChat);
    });
  }

  unSubscribe(subs) {
    this.#messagesSubscribers.delete(subs);
  }

  setCurrentChatId(id) {
    this.#currentChatId = id ? id : DEFAULT_CHAT_ID;
    this.getMessagesByChatId(this.#currentChatId);
  }

  async getMessagesByChatId(id) {
    this.#messagesByCurrentChat = await this.#httpService.get(`messages/${id}`);
    this.notifySubscribers();
  }
}
