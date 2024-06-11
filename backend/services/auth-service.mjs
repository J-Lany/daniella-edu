import bcrypt from "bcrypt";
import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

const ONE_WEEK = 7;
const ONE_DAY = 1;

export class AuthService {
  #userServise = diContainer.resolve(SERVICES.users);
  #configService = diContainer.resolve(SERVICES.config);
  #sessionService = diContainer.resolve(SERVICES.session);

  async createToken(login, email, limitation) {
    const hashData = `${login}${email}${this.#configService.secret}`;
    const saltRounds = 7;
    const expired = new Date();
    expired.setDate(expired.getDate() + limitation);

    try {
      const hash = bcrypt.hash(hashData, saltRounds);
      await this.#sessionService.setToken(hash, expired);

      return hash;
    } catch (err) {
      throw new Error("Ошибка в создании токена");
    }
  }
  async isAuth(token) {
    return await this.#sessionService.isTokenValid(token);
  }

  async login(email, password) {
    try {
      const user = await this.#userServise.getUserByEmail(email);
      if (!user) {
        throw new Error(403);
      }

      const isPasswordCorrect = bcrypt.compareSync(
        password,
        user.hashedPassword
      );
      if (!isPasswordCorrect) {
        throw new Error(401);
      }
      const accessToken = await this.createToken(email, user.login, ONE_DAY);
      const refreshToken = await this.createToken(email, user.login, ONE_WEEK);

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (err) {
      throw err;
    }
  }
}
