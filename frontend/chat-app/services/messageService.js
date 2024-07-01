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

  updateMessages(chatId, newMessages) {
    const existingMessages = this.#messages.get(chatId);
    const isMessagesChanged = existingMessages && JSON.stringify(existingMessages) === JSON.stringify(newMessages)

    if (isMessagesChanged) {
      return;
    }

    this.#messages.set(chatId, newMessages);
    this.notifyMessagesSubscribers();
  }

  async sendMessage(message) {
    const currentUser = this.#authService.getCurrentUser();
    const body = {
      authorId: currentUser.userId,
      messageBody: message,
      chatId: this.#currentChatId,
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
