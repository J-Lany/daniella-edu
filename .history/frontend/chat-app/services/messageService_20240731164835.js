import { diContainer } from "../di/di.js";
import { SERVICES } from "../di/api.js";
import { authGuard } from "../guards/auth-guard";

const LIMIT = 20;

export class MessageService {
  #httpService = authGuard(diContainer.resolve(SERVICES.http));
  #authService = diContainer.resolve(SERVICES.auth);
  #messagesSubscribers = new Set();
  #currentChatIdSubscribers = new Set();
  #messages = new Map();
  #historyMessages = new Map();
  #startIndexes = new Map();
  #currentChatId;
  #startIndex = 0;
  poolingInterval;

  getCurrentChatId() {
    return this.#currentChatId;
  }

  getStartIndex(chatId) {
    return this.#startIndexes.get(chatId);
  }

  subscribeCurrentChatId(subscribtion) {
    this.#currentChatIdSubscribers.add(subscribtion);
    return () => this.unSubscribeFromCurrentChatId(subscribtion);
  }

  subscribeMessagesByCurrentChat(subscribtion) {
    this.#messagesSubscribers.add(subscribtion);
    this.startPooling();
    return () => this.unSubscribeFromMessage(subscribtion);
  }

  notifyCurrentChatIdSubscribers() {
    this.#currentChatIdSubscribers.forEach((subscription) => {
      subscription(this.#currentChatId);
    });
  }

  async notifyMessagesSubscribers() {
    if (!this.#messages.has(this.#currentChatId)) {
      await this.getMessagesByChatId(this.#currentChatId);

      return;
    }

    this.#messagesSubscribers.forEach((subscription) => {
      subscription(this.#messages.get(this.#currentChatId));
    });
  }

  unSubscribeFromMessage(subscribtion) {
    this.#startIndexes.delete(this.#currentChatId);
    this.#messagesSubscribers.delete(subscribtion);
    this.stopPooling();
  }

  unSubscribeFromCurrentChatId(subscribtion) {
    this.#currentChatIdSubscribers.delete(subscribtion);
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
      const startIndex = result.content.newMessageIndex;

      return { messages, startIndex };
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

    const result = await this.fetchMessages(params);

    if (!result) {
      return;
    }

    if (result.messages) {
      this.updateMessages(chatId, result);
    }

    this.#startIndexes.set(chatId, result.startIndex);
  }

  async loadMoreMessages(chatId) {

    const params = {
      chatId,
      startIndex: this.#startIndexes.get(chatId),
      limit: LIMIT
    };

    const result = await this.fetchMessages(params);

    if (!result.messages) {
      return;
    }

    this.#historyMessages.set(this.#currentChatId, [
      ...(this.#historyMessages.get(this.#currentChatId) || []),
      ...result.messages
    ]);

    this.#startIndexes.set(chatId, result.startIndex);
    return result.messages;
  }

  updateMessages(chatId, result) {
    const startIndex = result.startIndex;
    const newMessages = result.messages;
    const existingMessages = this.#messages.get(chatId);

    if (!existingMessages || existingMessages.message) {
      this.setAndNotifyMessages(chatId, newMessages);
      return;
    }

    const lastBlockOld = existingMessages[existingMessages.length - 1];
    const lastMessageOld = lastBlockOld[lastBlockOld.length - 1];
    const lastBlockNew = newMessages[newMessages.length - 1];
    const lastMessageNew = lastBlockNew[lastBlockNew.length - 1];

    const areMessagesUnchanged = existingMessages && lastMessageOld.messageId === lastMessageNew.messageId;

    if (areMessagesUnchanged) {
      return;
    }
    this.#startIndexes.set(chatId, startIndex);
    this.setAndNotifyMessages(chatId, newMessages);
  }

  setAndNotifyMessages(chatId, newMessages) {
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
    }, 500);
  }

  stopPooling() {
    clearInterval(this.poolingInterval);
  }
}
