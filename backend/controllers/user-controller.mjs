import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";
import { ERRORS } from "../utils/chats-erorrs.mjs";

export function createUserController(app) {
  const userService = diContainer.resolve(SERVICES.users);
  /**
   * @swagger
   * /users/{userId}:
   *   get:
   *     summary: Получение пользователя по userId
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Пользователь по userId
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
    const userId = req.params.userId;

    try {
      const user = await userService.getUser(userId);
      console.log(user);
      return res.status(200).json(user);
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.userErrors[err.message] });
    }
  });
  /**
   * @swagger
   * /users/{userId}:
   *   patch:
   *     summary: Обновление пользователя
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *     responses:
   *       200:
   *         description: Успешное обновление пользователя
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: ID обновленного пользователя
   *                 firstName:
   *                   type: string
   *                   description: Обновленное имя пользователя
   *                 lastName:
   *                   type: string
   *                   description: Обновленная фамилия пользователя
   *                 email:
   *                   type: string
   *                   description: Обновленный email пользователя
   *       401:
   *         description: Пользователь не найден
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Сообщение об ошибке
   *       500:
   *         description: Ошибка на сервере
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Сообщение об ошибке
   */
  app.patch("/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    const updates = req.body;
    try {
      const updatedUser = await userService.updateUser(userId, updates);
      return res.status(200).json(updatedUser);
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.updateUserErrors[err.message] });
    }
  });
  /**
   * @swagger
   * /users/{userId}:
   *   delete:
   *     summary: Удаление пользователя по userId.
   *     description: Удаляет пользователя по указанному идентификатору.
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Пользователь успешно удален.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Сообщение о успешном удалении пользователя.
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
  app.delete("/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
      await userService.deleteUser(userId);
      return res.status(200).json({ message: "Пользователь удален" });
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.updateUserErrors[err.message] });
    }
  });
  /**
   * @swagger
   * /user/{firstName}:
   *   get:
   *     summary: Получение пользователя по firstName
   *     parameters:
   *       - in: path
   *         name: firstName
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Пользователь по firstName
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
  app.get("/user/:firstName", async (req, res) => {
    const firstName = req.params.firstName;

    try {
      const user = await userService.getUserByName(firstName);
      return res.status(200).json(user);
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.userErrors[err.message] });
    }
  });
}
