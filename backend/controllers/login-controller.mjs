import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";
import bcrypt from "bcrypt";

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

export function loginController(req, res) {
  const authService = diContainer.resolve(SERVICES.auth);
  const { login, password } = req.body;

  authService
    .login(login, password)
    .then((result) => res.status(200).json(result))
    .catch((err) => {
      switch (err.message) {
        case "403":
          return res
            .status(403)
            .json({ message: "Такого пользователя не существует" });
        case "401":
          return res.status(401).json({ message: "Неверный логин или пароль" });
        default:
          return res
            .status(500)
            .json({ message: "Ошибка в авторизации, попробуйте позднее" });
      }
    });
}
