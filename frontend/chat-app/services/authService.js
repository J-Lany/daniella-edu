import { diContainer } from "../di/di";
import { SERVICES } from "../di/api";
import { authGuard } from "../guards/auth-guard";

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";
export const USER = "user";

export class AuthService {
  #tokenSubscribers = new Set();
  #errorSubscribers = new Set();
  #currentUserSubscribers = new Set();
  #httpServise = authGuard(diContainer.resolve(SERVICES.http));
  #currentUser;
  #token;

  constructor() {
    this.#token = sessionStorage.getItem(ACCESS_TOKEN);
    this.#currentUser = JSON.parse(sessionStorage.getItem(USER));
  }

  subscribeCurrentUser(subscription) {
    this.#currentUserSubscribers.add(subscription);

    if (this.#currentUser) {
      this.notifyCurrentUserSubscribers();
    }

    return () => this.unSubscribeCurrentUser(subscription);
  }

  unSubscribeCurrentUser(subs) {
    this.#currentUserSubscribers.delete(subs);
  }

  notifyCurrentUserSubscribers() {
    this.#currentUserSubscribers.forEach((subscription) => {
      subscription(this.#currentUser);
    });
  }

  notifySubscribers() {
    this.#tokenSubscribers.forEach((subscription) => {
      subscription(this.#token);
    });
  }

  notifyError(error) {
    let errorMessage = error;
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    this.#errorSubscribers.forEach((subscription) => {
      subscription(errorMessage);
    });
  }

  unSubscribe(subs) {
    this.#tokenSubscribers.delete(subs);
  }

  subscribeToken(subscription) {
    this.#tokenSubscribers.add(subscription);

    if (this.#token) {
      this.notifySubscribers();
    }

    return () => this.unSubscribe(subscription);
  }

  subscribeOnLoginError(subs) {
    this.#errorSubscribers.add(subs);
    return () => this.unSubscribe(subs);
  }

  async login(email, password) {
    await this.#httpServise
      .post(`login/`, { email, password })
      .then((res) => {
        if (res.status !== 200) {
          this.notifyError(res.content.message);
          return;
        }

        sessionStorage.setItem(ACCESS_TOKEN, res.content.accessToken);
        sessionStorage.setItem(REFRESH_TOKEN, res.content.refreshToken);
        sessionStorage.setItem(USER, JSON.stringify(res.content.user));

        this.#currentUser = res.content.user;
        this.#token = res.content.accessToken;

        this.notifySubscribers();
      })
      .catch(this.notifyError.bind(this));
  }

  async registration(login, email, password) {
    return await this.#httpServise.post(`registration/`, {
      login,
      email,
      password,
    });
  }

  logout() {
    sessionStorage.removeItem(ACCESS_TOKEN);
    sessionStorage.removeItem(USER);

    this.#currentUser = null;
    this.#token = null;

    this.notifySubscribers();
    this.notifyCurrentUserSubscribers();
  }

  getToken() {
    return this.#token;
  }

  async refreshToken() {
    const token = sessionStorage.getItem(REFRESH_TOKEN);
    const userJSON = sessionStorage.getItem(USER);
    const user = JSON.parse(userJSON);

    const requestBody = {
      userId: user.userId,
      refreshToken: token,
    };

    const response = await this.#httpServise.post(`refresh-token`, requestBody);

    if (response.status === 200) {
      const content = await response.json();

      sessionStorage.setItem(REFRESH_TOKEN, content.refreshToken);
      sessionStorage.setItem(ACCESS_TOKEN, content.accessToken);

      this.#token = content.accessToken;

      return true;
    }

    this.logout();

    return false;
  }

  createAutoruzarionHeader() {
    const token = sessionStorage.getItem(ACCESS_TOKEN);
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  getCurrentUser() {
    return this.#currentUser;
  }
}
