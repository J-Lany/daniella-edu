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

  getCurrentChatId() {
    return this.#currentChatId;
  }

  getStartIndex() {
    return this.#startIndex;
  }

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

  async loadMoreMessages(chatId, startIndex) {
    if (!startIndex) {
      return;
    }
    const params = {
      chatId,
      startIndex,
      limit: LIMIT
    };

    const messages = await this.fetchMessages(params);

    if (!messages) {
      return;
    }

    this.#historyMessages.set(this.#currentChatId, [
      ...(this.#historyMessages.get(this.#currentChatId) || []),
      ...messages
    ]);


    return this.#historyMessages.get(this.#currentChatId);
  }

  updateMessages(chatId, newMessages) {
    const existingMessages = this.#messages.get(chatId);

    if (!existingMessages || existingMessages.message) {
      this.setAndNotifyMessages(chatId, newMessages);
      return;
    }

    const lastBlockOld = existingMessages[existingMessages.length - 1];
    const lastMessageOld = lastBlockOld[lastBlockOld.length - 1];
    const lastBlockNew = newMessages[newMessages.length - 1];
    const lastMessageNew = lastBlockNew[lastBlockNew.length - 1];

    const areMessagesUnchanged =
      existingMessages && lastMessageOld.messageId === lastMessageNew.messageId;

    if (areMessagesUnchanged) {
      return;
    }

    this.setAndNotifyMessages(chatId, newMessages);
  }

  setAndNotifyMessages(chatId, newMessages) {
    this.#messages.set(chatId, newMessages);
    this.#startIndex = result.content.newMessageIndex;
    
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
