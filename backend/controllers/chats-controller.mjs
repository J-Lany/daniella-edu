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
   *               chatType:
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
    const { authorId, participantsIds, chatType } = req.body;
    try {
      const chatId = await chatService.createChat(
        authorId,
        participantsIds,
        chatType
      );
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
        .json({ message: ERRORS.defaultChatErrors[err.message] });
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
      const result = await chatService.getChatsByUser(
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

  /**
   * @swagger
   * /chats/{chatId}:
   *   get:
   *     summary: Получение массива участников чата
   *     parameters:
   *       - in: query
   *         name: authorId
   *         required: true
   *         schema:
   *           type: string
   *       - name: chatId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Массив участников чата
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
   *       403:
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
   *         description: Ошибка при получении пользователей
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 errorMessage:
   *                   type: string
   *                   description: Сообщение об ошибке сервера
   */
  app.get("/chats/:chatId", authorization, async (req, res) => {
    const authorId = req.query.authorId;
    const chatId = req.params.chatId;
    try {
      const result = await chatService.getParticipants(chatId, authorId);
      return res.status(200).json(result);
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.getChatErrors[err.message] });
    }
  });

  /**
   * @swagger
   * /chats/delete-participants/{chatId}:
   *   patch:
   *     summary: Удаление участника чата
   *     parameters:
   *       - in: path
   *         name: chatId
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
   *               authorId:
   *                 type: string
   *               toDeleteParticipateId:
   *                 type: string
   *     responses:
   *       200:
   *         description: Успешное удаление участника чата
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: ID обновленного чата
   *       401:
   *         description: Чат не найден
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
  app.patch(
    "/chats/delete-participants/:chatId",
    authorization,
    async (req, res) => {
      const chatId = req.params.chatId;
      const { authorId, toDeleteParticipateId } = req.body;
      try {
        await chatService.deleteParticipants(
          authorId,
          chatId,
          toDeleteParticipateId
        );
        return res.status(200).json({ message: "Участник удален успешно" });
      } catch (err) {
        return res
          .status(parseInt(err.message))
          .json({ message: ERRORS.defaultChatErrors[err.message] });
      }
    }
  );

  /**
   * @swagger
   * /chat/add-participants/{chatId}:
   *   patch:
   *     summary: Добавление участника чата
   *     parameters:
   *       - in: path
   *         name: chatId
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
   *               authorId:
   *                 type: string
   *               participantsId:
   *                 type: array
   *                 items:
   *                   type: string
   *     responses:
   *       200:
   *         description: Успешное добавление участника чата
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: ID обновленного чата
   *       401:
   *         description: Чат не найден
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
  app.patch(
    "/chat/add-participants/:chatId",
    authorization,
    async (req, res) => {
      const chatId = req.params.chatId;
      const { authorId, participantsId } = req.body;
      try {
        await chatService.setParticipants(authorId, chatId, participantsId);
        return res.status(200).json({ message: "Участник добавлен успешно" });
      } catch (err) {
        return res
          .status(parseInt(err.message))
          .json({ message: ERRORS.defaultChatErrors[err.message] });
      }
    }
  );

  /**
   * @swagger
   * /chat/set-role/{chatId}:
   *   patch:
   *     summary: Добавление роли участнику чата
   *     parameters:
   *       - in: path
   *         name: chatId
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
   *               authorId:
   *                 type: string
   *               participantId:
   *                 type: string
   *               role:
   *                 type: string
   *     responses:
   *       200:
   *         description: Успешное добавление роли
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: ID обновленного чата
   *       401:
   *         description: Чат не найден / недостаточно прав
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
  app.patch("/chat/set-role/:chatId", authorization, async (req, res) => {
    const chatId = req.params.chatId;
    const { authorId, participantId, role } = req.body;
    try {
      await chatService.setSpesialRole(authorId, participantId, chatId, role);
      return res.status(200).json({ message: "Роль добавлена успешно" });
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.defaultChatErrors[err.message] });
    }
  });

  /**
   * @swagger
   * /chat/set-ban/{chatId}:
   *   patch:
   *     summary: Бан участника чата
   *     parameters:
   *       - in: path
   *         name: chatId
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
   *               authorId:
   *                 type: string
   *               participantId:
   *                 type: string
   *     responses:
   *       200:
   *         description: Успешное добавление бана
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   description: ID обновленного чата
   *       401:
   *         description: Чат не найден / недостаточно прав
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
  app.patch("/chat/set-ban/:chatId", authorization, async (req, res) => {
    const chatId = req.params.chatId;
    const { authorId, participantId } = req.body;
    try {
      await chatService.setBan(authorId, participantId, chatId);
      return res.status(200).json({ message: "Пользователь забанен успешно" });
    } catch (err) {
      return res
        .status(parseInt(err.message))
        .json({ message: ERRORS.defaultChatErrors[err.message] });
    }
  });
}
