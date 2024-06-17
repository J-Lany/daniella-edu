import bcrypt from "bcrypt";
import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

export const ONE_WEEK = 7;
export const ONE_DAY = 1;

export class AuthService {
  #userServise = diContainer.resolve(SERVICES.users);
  #sessionService = diContainer.resolve(SERVICES.session);

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
      const accessToken = await this.#sessionService.createToken(
        email,
        user.login,
        ONE_DAY
      );
      const refreshToken = await this.#sessionService.createToken(
        email,
        user.login,
        ONE_WEEK
      );

      return {
        user,
        accessToken,
        refreshToken,
      };
    } catch (err) {
      throw err;
    }
  }

  async logout (refreshToken, accessToken){
    await  this.#sessionService.deleteToken(refreshToken)
    await this.#sessionService.deleteToken(accessToken)
  }

  async isAuth(token) {
    return await this.#sessionService.isTokenValid(token);
  }
}
