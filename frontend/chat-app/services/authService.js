import { diContainer } from "../di/di";
import { SERVICES } from "../di/api";


export class AuthService {
   #userSubscribers = new Set();
   #errorSubscribers = new Set();
   #httpServise = diContainer.resolve(SERVICES.http);
   #currentUser;

   notifySubscribers() {
    this.#userSubscribers.forEach((subscription) => {
      subscription(this.#currentUser);
    });
  }

   notifyError(error) {
    this.#errorSubscribers.forEach((subscription) => {
      subscription();
    });
  }

   unSubscribe(subs) {
    this.#userSubscribers.delete(subs);
  }

   subscribeCurrentUser(subscription) {
    this.#userSubscribers.add(subscription);
    return () => this.unSubscribe(subscription);
  }

   subscribeOnLoginError(subs) {
    this.#errorSubscribers.add(subs);
    return () => this.unSubscribe(subs);
  }

  async  login(login, password) {
    await this.#httpServise
      .post(`login/`, { login, password })
      .then((res) => {
        console.log(res);
        this.#currentUser = res.user;
        this.notifySubscribers();
      })
      .catch(this.notifyError);
  }

  async  registration(login, password) {
    return await this.#httpServise.post(`registration/`, { login, password });
  }

 
}
