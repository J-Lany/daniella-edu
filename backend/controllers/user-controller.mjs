import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";
import { ERRORS } from "../utils/chats-erorrs.mjs";
import { authorization } from "../utils/authorization.mjs";

export function createUserController(app) {
  const userService = diContainer.resolve(SERVICES.users);
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Получить всех пользователей с пагинацией
   *     parameters:
   *       - name: userPerPage
   *         in: query
   *         required: true
   *         schema:
   *           type: integer
   *       - name: pageNumber
   *         in: query
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 users:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: string
   *                       name:
   *                         login: string
   */

  app.get("/users", authorization, async (req, res) => {
    const userPerPage = req.query.userPerPage;
    const pageNumber = req.query.pageNumber;
    const result = await userService.getUsers(userPerPage, pageNumber);

    return res.status(200).json(result);
  });

  /**
   * @swagger
   * /users/search:
   *   get:
   *     summary: Поиск пользователя по строке
   *     parameters:
   *       - in: query
   *         name: search
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *       - name: userPerPage
   *         in: query
   *         required: true
   *         schema:
   *           type: integer
   *       - name: pageNumber
   *         in: query
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Успешный запрос
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   userId:
   *                     type: string
   *                   login:
   *                     type: string
   *                   email:
   *                     type: string
   *                   firstName:
   *                     type: string
   *                   lastName:
   *                     type: string
   *       400:
   *         description: Ошибка валидации запроса
   */
  app.get("/users/search", authorization, async (req, res) => {
    const { search, userPerPage, pageNumber, userId } = req.query;

    try {
      const result = await userService.searchUser(
        search,
        userPerPage,
        pageNumber,
        userId
      );
      return res.status(200).json(result);
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.userErrors[err.message] });
    }
  });

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
  app.get("/users/:userId", authorization, async (req, res) => {
    const userId = req.params.userId;

    try {
      const user = await userService.getUser(userId);
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
  app.patch("/users/:userId", authorization, async (req, res) => {
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
  app.delete("/users/:userId", authorization, async (req, res) => {
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
}
