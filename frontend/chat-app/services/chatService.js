import { diContainer } from "../di/di";
import { SERVICES } from "../di/api";
import { authGuard } from "../guards/auth-guard";

const CHATS_PER_PAGE = 10;
const PAGE_NUMBER = 1;

export class ChatService {
  #httpServise = authGuard(diContainer.resolve(SERVICES.http));
  #authService = diContainer.resolve(SERVICES.auth);
  #chatsSubscribers = new Set();
  #chats;

  subscribeChats(subscription) {
    this.#chatsSubscribers.add(subscription);

    if (this.#chats) {
      this.notifyChatsSubscribers();
    }

    this.getChatsByCurrnetUser();
    return () => this.unSubscribeChats(subscription);
  }

  unSubscribeChats(subs) {
    this.#chatsSubscribers.delete(subs);
  }

  notifyChatsSubscribers() {
    const { userId } = this.#authService.getCurrentUser();

    this.#chatsSubscribers.forEach((subscription) => {
      subscription(this.#chats, userId);
    });
  }

  async getChatsByCurrnetUser() {
    const { userId } = this.#authService.getCurrentUser();

    const params = {
      authorId: userId,
      chatsPerPage: CHATS_PER_PAGE,
      pageNumber: PAGE_NUMBER,
    };
    const chatsParams = new URLSearchParams(params).toString();

    const result = await this.#httpServise.get(`chats?${chatsParams}`);

    this.#chats = result.content.result;
    this.notifyChatsSubscribers();
  }

  async createChat(participantsIds) {
    const { userId } = this.#authService.getCurrentUser();
    const body = {
      authorId: userId,
      chatType: "p2p",
      participantsIds: [userId, ...participantsIds],
    };

    await this.#httpServise.post(`chats`, body);

    await this.getChatsByCurrnetUser();
  }
}
