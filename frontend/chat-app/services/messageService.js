import { diContainer } from "../di/di.js";
import { SERVICES } from "../di/api.js";
import { authGuard } from "../guards/auth-guard";

const MESSAGES_PER_PAGE = 10;
const PAGE_NUMBER = 1;

export class MessageService {
  #httpService = authGuard(diContainer.resolve(SERVICES.http));
  #messagesSubscribers = new Set();
  #messages = new Map();
  #currentChatId;

  subscribeMessagesByCurrentChat(subscribtion) {
    this.#messagesSubscribers.add(subscribtion);
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

  async getMessagesByChatId(chatId) {
    const params = {
      chatId,
      messagesPerPage: MESSAGES_PER_PAGE,
      pageNumber: PAGE_NUMBER,
    };

    const getParams = new URLSearchParams(params).toString();
    const result = await this.#httpService.get(`messages?${getParams}`);

    if (result.status === 200) {
      this.#messages.set(this.#currentChatId, result.content);
      return result.content;
    }
    if(result.status === 404) {
      this.#messages.set(this.#currentChatId, {message: "В данном чате нет сообщений"});
    }
  }
}
