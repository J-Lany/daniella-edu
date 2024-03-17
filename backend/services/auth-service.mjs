import bcrypt from "bcrypt";
import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

export class AuthService {
  #userServise = diContainer.resolve(SERVICES.users);
  #token;
  getToken() {
    return this.#token;
  }

  async createToken(login, email) {
    const tokenString = `${login}${email}${new Date().toString()}`;
    const saltRounds = 7;

    try {
      const hash = await bcrypt.hash(tokenString, saltRounds);
      return hash;
    } catch (err) {
      throw new Error("Ошибка в создании токена");
    }
  }

  async login(login, password) {
    try {
      const currentUser = this.#userServise.getUser(login);
      if (!currentUser) {
        throw new Error(403);
      }
      if (!bcrypt.compareSync(password, currentUser.hashedPassword)) {
        throw new Error(401);
      }

      const token = await this.createToken(login, currentUser.email);
      return {
        user: { login, email: currentUser.email },
        token,
        message: "Вы успешно авторизованы",
      };
    } catch (err) {
      throw err;
    }
  }
}
