import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

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
 *                 message:
 *                   type: string
 *                   description: Информация о результате
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
  const userService = diContainer.resolve(SERVICES.users);
  const { login, password } = req.body;
  try {
    if (!userService.isUserAlreadyExist(login)) {
      return res
        .status(403)
        .json({ message: "Такой пользователь не существует" });
    }
    if ("Пароли не совпадают") {
      return res.status(401).json({ message: "Неверный логин или пароль" });
    }
    //Тут нужна проверка паролей и вытащить конкретного пользователя пользователя
    return res.status(200).json({ message: "тут нужно вернуть пользователя" });
  } catch {
    return res
      .status(500)
      .json({ message: "Ошибвка в авторизации, попробуйте позднее" });
  }
}
