export function authService() {
  let currentUser;
  async function getCurrentUser() {
    return Promise.resolve(currentUser);
  }
  async function login(login, password) {
    currentUser = {
      name: "Olga",
      avatar:
        "https://img.freepik.com/free-vector/hand-drawn-caricature-illustration_23-2149760515.jpg?t=st=1709056676~exp=1709060276~hmac=55f551634adbc78dfe62163921b8fd5ae89b2d05a7ef69f29f5cb3043d09ef1d&w=1380",
      status: "Active",
    };
    console.log("Запрос авторизации", currentUser, login, password);
    return Promise.resolve(currentUser);
  }
  return {
    getCurrentUser,
    login,
  };
}
