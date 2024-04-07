import { diContainer } from "../di/di.mjs";
import { SERVICES } from "../di/api.mjs";
/**
 * @swagger
 * /chat/createNewChat:
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
 *               participantsId:
 *                 type: array
 *                 items:
 *                   type: string

 *     responses:
 *       200:
 *         description: Успешное создание чата
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Чат создан успешно
 *       401:
 *         description: Такой чат уже существует
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Сообщение об ошибке
 *       500:
 *         description: Ошибка при создании чата
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: Сообщение об ошибке при создании чата
 */

/**
 * @swagger
 * /chat/deleteChat:
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

export function chatsController(req, res) {
  const chatService = diContainer.resolve(SERVICES.chat);

  switch (req.path) {
    case "/chat/deleteChat":
      const { authorId, participantsId } = req.body;

      try {
        chatService.createChat(authorId, participantsId);
        return res.status(200).json({ message: "Чат создан успешно" });
      } catch {
        return res
          .status(500)
          .json({ message: "Ошибка при создании чата, попробуйте позднее" });
      }

    case "/chat/createNewChat":
      const { chatId } = req.body;

      try {
        chatService.deleteChat(chatId);
        return res.status(200).json({ message: "Чат удален успешно" });
      } catch {
        return res
          .status(500)
          .json({ message: "Ошибка при удалении чата, попробуйте позднее" });
      }
  }
}
