import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";
import { ERRORS } from "../utils/chats-erorrs.mjs";

export function createLoginController(app) {
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
   *               login:
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
  const authService = diContainer.resolve(SERVICES.auth);

  app.post("/login", (req, res) => {
    const { login, password } = req.body;

    authService
      .login(login, password)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        return res
          .status(parseInt(err.message))
          .json({ message: ERRORS.loginErrors[err.message] });
      });
  });
}
