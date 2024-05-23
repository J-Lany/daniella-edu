import bcrypt from "bcrypt";
import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";
import { convertToDTO } from "../utils/UserDTO.mjs";

export class AuthService {
  #userServise = diContainer.resolve(SERVICES.users);
  #configService = diContainer.resolve(SERVICES.config);
  #sessionService = diContainer.resolve(SERVICES.session);

  async createToken(login, email) {
    const hashData = `${login}${email}${this.#configService.secret}`;
    const saltRounds = 7;
    const ONE_WEEK = 7;
    const expired = new Date();
    expired.setDate(expired.getDate() + ONE_WEEK);

    try {
      const hash = bcrypt.hash(hashData, saltRounds);
      await this.#sessionService.setToken(hash, expired);
      await this.#sessionService.getExpired(hash);
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
      const token = await this.createToken(email, user.login);

      return {
        user,
        token,
      };
    } catch (err) {
      throw err;
    }
  }
}
