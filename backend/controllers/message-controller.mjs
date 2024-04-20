import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";
import { ERRORS } from "../utils/chats-erorrs.mjs";
import { authorization } from "../utils/authorization.mjs";

export function createMessageController(app) {
  const messageService = diContainer.resolve(SERVICES.messages);

  /**
   * @swagger
   * /messages:
   *   post:
   *     summary: Создание сообщения
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               authorId:
   *                 type: string
   *               messageBody:
   *                 type: string
   *               chatId:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Успешное создание сообщения
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 chatId:
   *                   type: string
   *                   description: ID созданного сообщения
   *       '500':
   *         description: Ошибка при создании чата
   */

  app.post("/messages", authorization, async (req, res) => {
    const { authorId, messageBody, chatId } = req.body;

    try {
      const messageId = await messageService.addMessage(
        authorId,
        chatId,
        messageBody
      );
      return res.status(200).json({ messageId });
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.messageErrors[err.message] });
    }
  });

  /**
   * @swagger
   * /messages:
   *   get:
   *     summary: Получение массива сообщений по chatId
   *     parameters:
   *       - in: query
   *         name: chatId
   *         required: true
   *         schema:
   *           type: string
   *       - name: messagesPerPage
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
   *         description: Массив сообщений чата
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   authorId:
   *                     type: string
   *                   messageId:
   *                     type: string
   *                   createDate:
   *                     type: string
   *                   messageBody:
   *                     type: string
   *       401:
   *         description: У данного чата нет сообщений
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   description: Сообщение об ошибке
   *       500:
   *         description: Ошибка при получении сообщений
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMessage:
   *                   type: string
   *                   description: Сообщение об ошибке сервера
   */

  app.get("/messages", authorization, async (req, res) => {
    const chatId = req.query.chatId;
    const messagesPerPage = req.query.messagesPerPage;
    const pageNumber = req.query.pageNumber;

    try {
      const result = await messageService.getMessagesByChat(
        chatId,
        messagesPerPage,
        pageNumber
      );
      return res.status(200).json(result);
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.messageErrors[err.message] });
    }
  });

  /**
   * @swagger
   * /messages/{messageId}:
   *   patch:
   *     summary: Обновление сообщения
   *     parameters:
   *       - in: path
   *         name: messageId
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               chatId:
   *                 type: string
   *               messageBody:
   *                 type: string
   *     responses:
   *       200:
   *         description: Успешное обновление сообщения
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: ID обновленного сообщения
   *                 messageBody:
   *                   type: string
   *                   description: Обновленное сообщение
   *       401:
   *         description: Сообщение не найдено
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

  app.patch("/messages/:messageId", authorization, async (req, res) => {
    const messageId = req.params.messageId;
    const { chatId, messageBody } = req.body;
    try {
      await messageService.updateMessage(chatId, messageId, messageBody);
      return res.status(200).json();
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.messageErrors[err.message] });
    }
  });

  /**
   * @swagger
   * /messages:
   *   delete:
   *     summary: Удаление сообщения
   *     parameters:
   *       - in: query
   *         name: chatId
   *         required: true
   *         schema:
   *           type: string
   *       - in: query
   *         name: messageId
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Успешное удаление сообщения
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
  app.delete("/messages", authorization, async (req, res) => {
    const chatId = req.query.chatId;
    const messageId = req.query.messageId;
    try {
      await messageService.deleteMessage(chatId, messageId);
      return res.status(200).json({ message: "Чат удален успешно" });
    } catch {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.messageErrors[err.message] });
    }
  });
}
