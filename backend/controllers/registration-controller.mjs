import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Регистрация в месседжере
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string

 *     responses:
 *       200:
 *         description: Успешная регистрация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 login:
 *                   type: string
 *                   description: Логин
 *                 message:
 *                   type: string
 *                   description: Информация о результате
 *       401:
 *         description: Такой пользователь уже существует
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Сообщение об ошибке
 */

export function registrationController(req, res) {
  const userService = diContainer.resolve(SERVICES.users);
  const { login, email, password } = req.body;
  const users = userService.getUsers();
  if (isUserExist(users, login)) {
    return res
      .status(401)
      .json({ message: "Такой пользователь уже существует" });
  }
  userService.setUser({ login, email, password });
  // console.log(userService.getUsers());
  return res
    .status(200)
    .json({ login, message: `${login} вы успешно зарегестрированы` });
}

const isUserExist = (users, login) => {
  let checkUsers = users.filter((user) => user.login === login);
  return checkUsers.length > 0 ? true : false;
};
