import { diContainer } from "../di/di";
import { SERVICES } from "../di/api";

export class AuthService {
  #tokenSubscribers = new Set();
  #errorSubscribers = new Set();
  #httpServise = diContainer.resolve(SERVICES.http);
  #userService = diContainer.resolve(SERVICES.user);
  #token;

  notifySubscribers() {
    this.#tokenSubscribers.forEach((subscription) => {
      subscription(this.#token);
    });
  }

  notifyError(error) {
    this.#errorSubscribers.forEach((subscription) => {
      subscription();
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
        this.#userService.setCurrentUser(res.user);
        this.#token = res.token;
        this.#userService.setToken(res.token);
        this.notifySubscribers();
      })
      .catch(this.notifyError);
  }

  async registration(login, email, password) {
    return await this.#httpServise.post(`registration/`, {
      login,
      email,
      password,
    });
  }

  getToken() {
    return this.#token;
  }
}
