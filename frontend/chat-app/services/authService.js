const userSubscribers = new Set();
const errorSubscribers = new Set();

export function authService() {
  let currentUser;
  const mocUser = {
    name: "Olga",
    avatar:
      "https://img.freepik.com/free-vector/hand-drawn-caricature-illustration_23-2149760515.jpg?t=st=1709056676~exp=1709060276~hmac=55f551634adbc78dfe62163921b8fd5ae89b2d05a7ef69f29f5cb3043d09ef1d&w=1380",
    status: "Active",
  };

  function notifySubscribers() {
    userSubscribers.forEach((subscription) => {
      subscription(currentUser);
    });
  }

  function notifyError(error) {
    errorSubscribers.forEach((subscription) => {
      subscription(error);
      console.log(error)
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
    if (login && password) {
      currentUser = mocUser;
      notifySubscribers();
      return
    }
    notifyError("Неверный логин или пароль");
    
  }

  return {
    subscribeCurrentUser,
    subscribeOnLoginError,
    login,
  };
}
