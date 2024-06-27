import { diContainer } from "../di/di.js";
import { SERVICES } from "../di/api.js";
import { authGuard } from "../guards/auth-guard";

const LIMIT = 10;

export class MessageService {
  #httpService = authGuard(diContainer.resolve(SERVICES.http));
  #authService = diContainer.resolve(SERVICES.auth);
  #messagesSubscribers = new Set();
  #messages = new Map();
  #currentChatId;
  #startIndex = 0;

  subscribeMessagesByCurrentChat(subscribtion) {
    this.#messagesSubscribers.add(subscribtion);
    this.startPooling();
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
    if (this.#messagesSubscribers.size === 0) {
      this.stopPooling();
    }
  }

  setCurrentChatId(id) {
    this.#currentChatId = id;
    this.notifySubscribers();
  }

  async getMessagesByChatId(chatId) {
    const params = {
      chatId,
      startIndex: this.#startIndex,
      limit: LIMIT,
    };

    const getParams = new URLSearchParams(params).toString();
    const result = await this.#httpService.get(`messages?${getParams}`);

    if (result.status === 200) {
      const messages = result.content.result;
      this.#startIndex = result.content.newMessageIndex;

      this.updateMessages(chatId, messages);
      return result.content;
    }

    if (result.status === 404) {
      this.#messages.set(this.#currentChatId, {
        message: "В данном чате нет сообщений",
      });
      return;
    }
  }

  updateMessages(chatId, messages) {
    this.#messages.set(chatId, messages);
    this.notifySubscribers();
  }

  async sendMessage(message) {
    const currentUser = this.#authService.getCurrentUser();
    const body = {
      authorId: currentUser.userId,
      messageBody: message,
      chatId: this.#currentChatId,
    };
    const result = await this.#httpService.post(`messages`, body);
    if (result.status === 200) {
      console.log(200);
    }
  }

  startPooling() {
    this.poolingInterval = setInterval(() => {
      if (this.#currentChatId) {
        this.getMessagesByChatId(this.#currentChatId);
      }
    }, 5000);
  }

  stopPooling() {
    clearInterval(this.poolingInterval);
  }
}
