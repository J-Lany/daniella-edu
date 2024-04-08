import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

export function createRegistrationController(app) {
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
   *       500:
   *         description: Ошибка регистрации
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMessage:
   *                   type: string
   *                   description: Сообщение об ошибке регистрации
   */
  const userService = diContainer.resolve(SERVICES.users);
  app.post("/registration", (req, res) => {
    const { login, email, password } = req.body;

    try {
      if (userService.isUserAlreadyExist(login)) {
        return res
          .status(401)
          .json({ message: "Такой пользователь уже существует" });
      }
      userService.setUser({ login, email, password });

      return res
        .status(200)
        .json({ message: `${login} вы успешно зарегестрированы` });
    } catch {
      return res
        .status(500)
        .json({ message: "Ошибка регистрации, попробуйте позднее" });
    }
  });
}
