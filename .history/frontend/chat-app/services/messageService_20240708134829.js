import { diContainer } from "../di/di.js";
import { SERVICES } from "../di/api.js";
import { authGuard } from "../guards/auth-guard";

const LIMIT = 10;

export class MessageService {
  #httpService = authGuard(diContainer.resolve(SERVICES.http));
  #authService = diContainer.resolve(SERVICES.auth);
  #messagesSubscribers = new Set();
  #currentChatIdSubscribers = new Set();
  #messages = new Map();
  #historyMessages = new Map();
  #currentChatId;
  #startIndex = 0;
  poolingInterval;

  subscribeCurrentChatId(subscribtion) {
    this.#currentChatIdSubscribers.add(subscribtion);
    return () => this.unSubscribeFromCurrentChatId();
  }

  subscribeMessagesByCurrentChat(subscribtion) {
    this.#messagesSubscribers.add(subscribtion);
    this.startPooling();
    return () => this.unSubscribeFromMessage();
  }

  notifyCurrentChatIdSubscribers() {
    this.#currentChatIdSubscribers.forEach((subscription) => {
      subscription(this.#currentChatId);
    });
  }

  async notifyMessagesSubscribers() {
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

  unSubscribeFromMessage(subs) {
    this.#messagesSubscribers.delete(subs);
    this.stopPooling();
  }

  unSubscribeFromCurrentChatId(subs) {
    this.#currentChatIdSubscribers.delete(subs);
  }

  setCurrentChatId(id) {
    this.#currentChatId = id;
    this.notifyCurrentChatIdSubscribers();
    this.notifyMessagesSubscribers();
  }

  async fetchMessages(params) {
    const getParams = new URLSearchParams(params).toString();
    const result = await this.#httpService.get(`messages?${getParams}`);

    if (result.status === 200) {
      const messages = result.content.result;

      return messages;
    }

    if (result.status === 404) {
      this.#messages.set(this.#currentChatId, {
        message: "В данном чате нет сообщений"
      });
      return;
    }
  }

  async getMessagesByChatId(chatId) {
    const params = {
      chatId,
      startIndex: 0,
      limit: LIMIT
    };

    const messages = await this.fetchMessages(params);

    if (messages) {
      this.updateMessages(chatId, messages);
    }
    return messages;
  }

  async getMessagesOnScroll() {
    if(!this.#startIndex) {
      this.#startIndex = Math.max(this.#messages.get(this.#currentChatId).length - LIMIT, 0);
    }

    const params = {
      chatId: this.#currentChatId,
      startIndex: this.#startIndex,
      limit: LIMIT
    };

    const messages = await this.fetchMessages(params);

    if (messages) {
      this.#historyMessages.set(this.#currentChatId, [...this.#historyMessages.get(this.#currentChatId) || [],...messages] )
      console.log(messages);
    }
    return messages;
  }

  updateMessages(chatId, newMessages) {
    this.#messages.set(chatId, newMessages);
    this.notifyMessagesSubscribers();
  }

  async sendMessage(message) {
    const currentUser = this.#authService.getCurrentUser();
    const body = {
      authorId: currentUser.userId,
      messageBody: message,
      chatId: this.#currentChatId
    };
    return await this.#httpService.post(`messages`, body);
  }

  startPooling() {
    this.poolingInterval = setInterval(() => {
      if (this.#currentChatId) {
        this.getMessagesByChatId(this.#currentChatId);
      }
    }, 200);
  }

  stopPooling() {
    clearInterval(this.poolingInterval);
  }
}
