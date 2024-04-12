import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";
import { ERRORS } from "../utils/chats-erorrs.mjs";

export function createUserController(app) {
  const userService = diContainer.resolve(SERVICES.users);
  /**
   * @swagger
   * /users/{login}:
   *   get:
   *     summary: Получение пользователя по login
   *     parameters:
   *       - in: path
   *         name: login
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Пользователь по login
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 userId:
   *                   type: string
   *                 login:
   *                   type: string
   *                 firstName:
   *                   type: string
   *                 lastName:
   *                   type: string
   *                 email:
   *                   type: string
   *       401:
   *         description: Такого пользователя не существует
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Сообщение об ошибке
   *       500:
   *         description: Ошибка при получении пользователя
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMessage:
   *                   type: string
   *                   description: Сообщение об ошибке сервера
   */
  app.get("/users/:userId", async (req, res) => {
    const login = req.params.userId;

    try {
      const user = await userService.getUser(login);
      console.log(user);
      return res.status(200).json(user);
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.getChatErrors[err.message] });
    }
  });
}
