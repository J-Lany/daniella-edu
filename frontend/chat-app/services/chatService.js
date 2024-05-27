import { diContainer } from "../di/di";
import { SERVICES } from "../di/api";

const CHATS_PER_PAGE = 10;
const PAGE_NUMBER = 1;

export class ChatService {
  #httpServise = diContainer.resolve(SERVICES.http);
  #authService = diContainer.resolve(SERVICES.auth);

  async getChatsByCurrnetUser(authorId) {
    const token = this.#authService.getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const params = {
      authorId,
      chatsPerPage: CHATS_PER_PAGE,
      pageNumber: PAGE_NUMBER,
    };
    const chatsParams = new URLSearchParams(params).toString();

    const chats = await this.#httpServise.get(`chats?${chatsParams}`, headers);

    return chats.result;
  }
}
