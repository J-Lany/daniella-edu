import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";
import { ERRORS } from "../utils/chats-erorrs.mjs";
import { authorization } from "../utils/authorization.mjs";

export function createChatsController(app) {
  const chatService = diContainer.resolve(SERVICES.chat);

  /**
   * @swagger
   * /chats:
   *   post:
   *     summary: Создание чата
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               authorId:
   *                 type: string
   *               participantsIds:
   *                 type: array
   *                 items:
   *                   type: string
   *     responses:
   *       '200':
   *         description: Успешное создание чата
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 chatId:
   *                   type: string
   *                   description: ID созданного чата
   *       '401':
   *         description: Такой чат уже существует
   *       '500':
   *         description: Ошибка при создании чата
   */
  app.post("/chats", authorization, async (req, res) => {
    const { authorId, participantsIds } = req.body;
    try {
      const chatId = await chatService.createChat(authorId, participantsIds);
      return res.status(200).json({ chatId });
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.createChatErrors[err.message] });
    }
  });

  /**
   * @swagger
   * /chats:
   *   delete:
   *     summary: Удаление чата
   *     parameters:
   *       - in: query
   *         name: chatId
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: authorId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Успешное удаление чата
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Чат удален успешно
   *       401:
   *         description: Такой чат не существует
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Сообщение об ошибке
   *       500:
   *         description: Ошибка при удалении чата
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMessage:
   *                   type: string
   *                   description: Сообщение об ошибке при удален и чата
   */
  app.delete("/chats", authorization, async (req, res) => {
    const chatId = req.query.chatId;
    const authorId = req.query.authorId;

    try {
      await chatService.deleteChat(authorId, chatId);
      return res.status(200).json({ message: "Чат удален успешно" });
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.deleteChatErrors[err.message] });
    }
  });

  /**
   * @swagger
   * /chats:
   *   get:
   *     summary: Получение массива чатов по authorId
   *     parameters:
   *       - in: query
   *         name: authorId
   *         required: true
   *         schema:
   *           type: string
   *       - name: chatsPerPage
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
   *         description: Массив чатов пользователя
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   chatId:
   *                     type: string
   *                   date:
   *                     type: string
   *                   participantsId:
   *                     type: array
   *                     items:
   *                       type: string
   *       401:
   *         description: У данного пользователя нет чатов
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Сообщение об ошибке
   *       500:
   *         description: Ошибка при получении чатов
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMessage:
   *                   type: string
   *                   description: Сообщение об ошибке сервера
   */
  app.get("/chats", authorization, async (req, res) => {
    const authorId = req.query.authorId;
    const chatsPerPage = req.query.chatsPerPage;
    const pageNumber = req.query.pageNumber;
    try {
      const result = await chatService.getChatsByAythor(
        authorId,
        chatsPerPage,
        pageNumber
      );
      return res.status(200).json(result);
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.getChatErrors[err.message] });
    }
  });
}
