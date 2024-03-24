import { diContainer } from "../di/di";
import { SERVICES } from "../di/api";

const userSubscribers = new Set();
const errorSubscribers = new Set();

export function authService() {
  const httpServise = diContainer.resolve(SERVICES.http);
  let currentUser;

  function notifySubscribers() {
    userSubscribers.forEach((subscription) => {
      subscription(currentUser);
    });
  }

  function notifyError(error) {
    errorSubscribers.forEach((subscription) => {
      subscription();
    });
  }

  function unSubscribe(subs) {
    userSubscribers.delete(subs);
  }

  function subscribeCurrentUser(subscription) {
    userSubscribers.add(subscription);
    return () => unSubscribe(subscription);
  }

  function subscribeOnLoginError(subs) {
    errorSubscribers.add(subs);
    return () => unSubscribe(subs);
  }

  async function login(login, password) {
    await httpServise
      .post(`login/`, { login, password })
      .then((res) => {
        console.log(res);
        currentUser = res.user;
        notifySubscribers();
      })
      .catch(notifyError);
  }

  async function registration(login, password) {
    return await httpServise.post(`registration/`, { login, password });
  }

  return {
    subscribeCurrentUser,
    subscribeOnLoginError,
    login,
    registration,
  };
}
