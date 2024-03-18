import bcrypt from "bcrypt";
import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

export class AuthService {
  #userServise = diContainer.resolve(SERVICES.users);
  #configService = diContainer.resolve(SERVICES.config);

  #token;
  getToken() {
    return this.#token;
  }

  async createToken(login, email) {
    const hashData = `${login}${email}${this.#configService.secret}`;
    const saltRounds = 7;
    const expired = new Date();
    expired.setDate(expired.getDate() + 7);

    try {
      const hash = await bcrypt.hash(hashData, saltRounds);
      return { expired, hash };
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

      const tokenData = await this.createToken(login, currentUser.email);
      return {
        user: currentUser,
        tokenData,
      };
    } catch (err) {
      throw err;
    }
  }
}
