import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";

export function createChatsController(app) {
  const chatService = diContainer.resolve(SERVICES.chat);

  /**
   * @swagger
   * /chats/create-chat:
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
   *               participantId:
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
  app.post("/chats/create-chat", (req, res) => {
    const { authorId, participantsId } = req.body;
    try {
      const chatId = chatService.createChat(authorId, participantsId);
      return res.status(200).json({ chatId });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Ошибка при создании чата, попробуйте позднее" });
    }
  });

  /**
   * @swagger
   * /chats/delete-chat:
   *   post:
   *     summary: Удаление чата
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               chatId:
   *                 type: string
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
  app.post("/chats/delete-chat", (req, res) => {
    const { chatId } = req.body;

    try {
      chatService.deleteChat(chatId);
      return res.status(200).json({ message: "Чат удален успешно" });
    } catch {
      return res
        .status(500)
        .json({ message: "Ошибка при удалении чата, попробуйте позднее" });
    }
  });

  /**
   * @swagger
   * /chats/{authorId}:
   *   get:
   *     summary: Получение массива чатов по authorId
   *     parameters:
   *       - in: path
   *         name: authorId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Массив  чатов пользователя
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

  app.get("/chats/{authorId}", (req, res) => {
    const { authorId } = req.params;
    try {
      const { chatId, date, participantsId } =
        chatService.getChatsByAythor(authorId);
      return res.status(200).json({ chatId, date, participantsId });
    } catch (err) {
      switch (err.message) {
        case "401":
          return res
            .status(401)
            .json({ message: "У данного пользователя нет чатов" });
        default:
          return res
            .status(500)
            .json({ message: "Ошибка в получении чатов, попробуйте позднее" });
      }
    }
  });
}
