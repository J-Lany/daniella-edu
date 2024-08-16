import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";
import { ERRORS } from "../utils/chats-erorrs.mjs";

export function createAuthController(app) {
  const authService = diContainer.resolve(SERVICES.auth);
  const sessionService = diContainer.resolve(SERVICES.session);
  const UserService = diContainer.resolve(SERVICES.users)

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Авторизация в месседжере
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Успешная авторизация
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   type: object
   *                   properties:
   *                     login:
   *                       type: string
   *                       description: Имя пользователя
   *                     email:
   *                       type: string
   *                       description: Email пользователя
   *                     password:
   *                       type: string
   *                       description: Хэш пароля пользователя
   *                 token:
   *                   type: string
   *                   description: Авторизационный токен
   *       401:
   *         description: Неверный логин или пароль
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Сообщение об ошибке
   *       403:
   *         description: Такого пользователя не сущетсвует
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMessage:
   *                   type: string
   *                   description: Сообщение об ошибке авторизации
   *       500:
   *         description: Ошибка авторизации
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMessage:
   *                   type: string
   *                   description: Сообщение об ошибке авторизации
   */

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const { accessToken, refreshToken } = await authService.login(
        email,
        password
      );
      const user = await 
      return res.status(200).json(result);
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.loginErrors[err.message] });
    }
  });

  /**
   * @swagger
   * /v2/login:
   *   post:
   *     summary: v2. Авторизация в месседжере
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Успешная авторизация
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   description: Авторизационный токен
   *       401:
   *         description: Неверный логин или пароль
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Сообщение об ошибке
   *       403:
   *         description: Такого пользователя не сущетсвует
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMessage:
   *                   type: string
   *                   description: Сообщение об ошибке авторизации
   *       500:
   *         description: Ошибка авторизации
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMessage:
   *                   type: string
   *                   description: Сообщение об ошибке авторизации
   */

  app.post("/v2/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await authService.login(email, password);
      return res.status(200).json(result);
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.loginErrors[err.message] });
    }
  });

  /**
   * @swagger
   * /refresh-token:
   *   post:
   *     summary: Обновление токена
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
   *                 type: string
   *               userId:
   *                 type: string
   *     responses:
   *       200:
   *         description: Успешная авторизация
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   *                   description: Токен доступа
   *                 refreshToken:
   *                   type: string
   *                   description: Токен обновления
   *       401:
   *         description: Токен обновления неддействителен
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Сообщение об ошибке
   *       500:
   *         description: Ошибка авторизации
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMessage:
   *                   type: string
   *                   description: Сообщение об ошибке авторизации
   */

  app.post("/refresh-token", async (req, res) => {
    const { refreshToken, userId } = req.body;
    try {
      const result = await sessionService.updateTokenPair(refreshToken, userId);
      return res.status(200).json(result);
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.tokenErrors[err.message] });
    }
  });

  /**
   * @swagger
   * /logout:
   *   post:
   *     summary: Выход из системы
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
   *                 type: string
   *               accessToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: Успешный выход из системы
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 accessToken:
   *                   type: string
   *                   description: Токен доступа
   *                 refreshToken:
   *                   type: string
   *                   description: Токен обновления
   *       401:
   *         description: Такого токена не существует
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Сообщение об ошибке
   *       500:
   *         description: Ошибка разлогина
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMessage:
   *                   type: string
   *                   description: Сообщение об ошибке авторизации
   */

  app.post("/logout", async (req, res) => {
    const { refreshToken, accessToken } = req.body;
    try {
      const result = await authService.logout(refreshToken, accessToken);
      return res.status(200).json(result);
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.tokenErrors[err.message] });
    }
  });
}
