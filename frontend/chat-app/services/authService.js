import { diContainer } from "../di/di";
import { SERVICES } from "../di/api";

export const TOKEN = "token";
export const USER = "user";

export class AuthService {
  #tokenSubscribers = new Set();
  #errorSubscribers = new Set();
  #httpServise = diContainer.resolve(SERVICES.http);
  #currentUser;
  #token;

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

        sessionStorage.setItem(TOKEN, res.content.token);
        sessionStorage.setItem(USER, JSON.stringify(res.content.user));

        this.#currentUser = res.content.user;
        this.#token = res.content.token;

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

  getToken() {
    if (this.#token) {
      return this.#token;
    }
    return sessionStorage.getItem(TOKEN);
  }

  getCurrentUser() {
    if (this.#currentUser) {
      return this.#currentUser;
    }
    this.#currentUser = JSON.parse(sessionStorage.getItem(USER));
    return this.#currentUser;
  }
}
